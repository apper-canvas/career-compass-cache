import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Resume from "@/pages/Resume";

export default function ResumeUploader({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadCompleted, setUploadCompleted] = useState(null)
  const fileInputRef = useRef(null);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };
  
const handleFiles = (files) => {
    const validTypes = ['.pdf', '.doc', '.docx'];
    const validFiles = Array.from(files).filter(file => {
      const fileExtension = `.${file.name.split('.').pop().toLowerCase()}`;
      return validTypes.includes(fileExtension);
    });

    if (validFiles.length === 0) {
      toast.error("Please select a valid file (PDF, DOC, DOCX)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadCompleted(null);
    
    // Store file info for completion handling
    const fileInfo = {
      name: validFiles[0].name,
      file: validFiles[0]
    };
    
    // Start upload process
    setTimeout(() => {
      setUploadCompleted(fileInfo);
    }, 2000); // Simulate upload time
  };

  // Handle upload progress
  useEffect(() => {
    if (!isUploading) return

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)

    return () => clearInterval(interval)
  }, [isUploading])

  // Handle upload completion side effects
  useEffect(() => {
    if (!uploadCompleted) return

    const resume = {
      Id: Date.now(),
      fileName: uploadCompleted.name,
      uploadDate: new Date().toISOString(),
      fileUrl: URL.createObjectURL(uploadCompleted.file),
      isActive: true
    }

    onUpload(resume)
    toast.success("Resume uploaded successfully!")
  }, [uploadCompleted, onUpload])
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ApperIcon name="Upload" className="w-5 h-5" />
        Upload Resume
      </h3>
      
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-primary-500 bg-primary-50"
            : "border-gray-300 hover:border-primary-400 hover:bg-gray-50"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-4">
            <ApperIcon name="FileText" className="w-8 h-8 text-primary-600" />
          </div>
          
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Drop your resume here
          </h4>
          
          <p className="text-gray-600 mb-4">
            or click to browse files
          </p>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="mb-4"
          >
            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
            Choose File
          </Button>
          
          <p className="text-sm text-gray-500">
            Supported formats: PDF, DOC, DOCX (Max 10MB)
          </p>
          
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 w-full max-w-xs"
            >
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-primary-600 to-primary-700 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </motion.div>
          )}
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};
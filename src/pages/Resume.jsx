import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { format } from "date-fns";
import ResumeUploader from "@/components/organisms/ResumeUploader";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { resumeService } from "@/services/api/resumeService";

const Resume = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const loadResumes = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await resumeService.getAll();
      setResumes(data);
    } catch (err) {
      setError("Failed to load resumes. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadResumes();
  }, []);
  
  const handleUpload = async (resumeData) => {
    try {
      // Set all existing resumes to inactive
      const updatedResumes = resumes.map(resume => ({
        ...resume,
        isActive: false
      }));
      
      // Save all updates
      for (const resume of updatedResumes) {
        await resumeService.update(resume.Id, resume);
      }
      
      // Create new resume
      const newResume = await resumeService.create(resumeData);
      
      // Update local state
      setResumes(prev => [...prev.map(r => ({ ...r, isActive: false })), newResume]);
      
    } catch (err) {
      toast.error("Failed to upload resume. Please try again.");
    }
  };
  
  const handleSetActive = async (resumeId) => {
    try {
      // Update all resumes to inactive
      const updatedResumes = resumes.map(resume => ({
        ...resume,
        isActive: resume.Id === resumeId
      }));
      
      // Save all updates
      for (const resume of updatedResumes) {
        await resumeService.update(resume.Id, resume);
      }
      
      setResumes(updatedResumes);
      toast.success("Active resume updated successfully!");
      
    } catch (err) {
      toast.error("Failed to update active resume. Please try again.");
    }
  };
  
  const handleDelete = async (resumeId) => {
    try {
      await resumeService.delete(resumeId);
      setResumes(prev => prev.filter(resume => resume.Id !== resumeId));
      toast.success("Resume deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete resume. Please try again.");
    }
  };
  
  const handleDownload = (resume) => {
    // In a real app, this would download the actual file
    const link = document.createElement("a");
    link.href = resume.fileUrl;
    link.download = resume.fileName;
    link.click();
    toast.success("Resume downloaded!");
  };
  
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadResumes} />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Resume Management
        </h1>
        <p className="text-gray-600">
          Upload and manage your resumes for job applications
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div>
          <ResumeUploader onUpload={handleUpload} />
        </div>
        
        {/* Resumes List */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Resumes
          </h2>
          
          {resumes.length === 0 ? (
            <Empty
              title="No resumes uploaded"
              message="Upload your first resume to get started with job applications."
              actionText="Upload Resume"
              onAction={() => document.querySelector('input[type="file"]')?.click()}
              icon="FileText"
            />
          ) : (
            <div className="space-y-4">
              {resumes.map((resume) => (
                <motion.div
                  key={resume.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-lg p-4 border ${
                    resume.isActive ? "border-primary-500 bg-primary-50" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                        <ApperIcon name="FileText" className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {resume.fileName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Uploaded {format(new Date(resume.uploadDate), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {resume.isActive && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                          Active
                        </span>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDownload(resume)}
                        title="Download"
                      >
                        <ApperIcon name="Download" className="w-4 h-4" />
                      </Button>
                      
                      {!resume.isActive && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleSetActive(resume.Id)}
                          title="Set as Active"
                        >
                          <ApperIcon name="Star" className="w-4 h-4" />
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(resume.Id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Resume;
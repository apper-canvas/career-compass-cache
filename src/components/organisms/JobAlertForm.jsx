import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const JobAlertForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    keywords: "",
    location: "",
    industry: "",
    frequency: "daily"
  });
  
  const industries = [
    { value: "", label: "All Industries" },
    { value: "technology", label: "Technology" },
    { value: "healthcare", label: "Healthcare" },
    { value: "finance", label: "Finance" },
    { value: "education", label: "Education" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "consulting", label: "Consulting" },
    { value: "retail", label: "Retail" }
  ];
  
  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" }
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.keywords.trim()) {
      toast.error("Please enter keywords for your job alert");
      return;
    }
    
    const alert = {
      Id: Date.now(),
      keywords: formData.keywords.split(",").map(k => k.trim()).filter(k => k),
      locations: formData.location ? [formData.location] : [],
      industries: formData.industry ? [formData.industry] : [],
      frequency: formData.frequency,
      createdDate: new Date().toISOString(),
      isActive: true
    };
    
    onSave(alert);
    toast.success("Job alert created successfully!");
    
    // Reset form
    setFormData({
      keywords: "",
      location: "",
      industry: "",
      frequency: "daily"
    });
  };
  
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <ApperIcon name="Bell" className="w-5 h-5" />
        Create Job Alert
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Keywords"
          type="text"
          placeholder="e.g., React Developer, Product Manager"
          value={formData.keywords}
          onChange={(e) => handleChange("keywords", e.target.value)}
          className="w-full"
        />
        
        <FormField
          label="Location"
          type="text"
          placeholder="e.g., San Francisco, CA"
          value={formData.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="w-full"
        />
        
        <FormField
          label="Industry"
          type="select"
          options={industries}
          value={formData.industry}
          onChange={(e) => handleChange("industry", e.target.value)}
          className="w-full"
        />
        
        <FormField
          label="Frequency"
          type="select"
          options={frequencies}
          value={formData.frequency}
          onChange={(e) => handleChange("frequency", e.target.value)}
          className="w-full"
        />
        
        <Button
          type="submit"
          className="w-full flex items-center justify-center gap-2"
        >
          <ApperIcon name="Plus" className="w-4 h-4" />
          Create Alert
        </Button>
      </form>
    </motion.div>
  );
};

export default JobAlertForm;
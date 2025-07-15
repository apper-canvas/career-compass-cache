import { useState } from "react";
import { motion } from "framer-motion";
import FormField from "@/components/molecules/FormField";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const JobFilters = ({ onFilterChange, onClearFilters }) => {
  const [filters, setFilters] = useState({
    location: "",
    industry: "",
    jobType: "",
    experience: "",
    salary: ""
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
  
  const jobTypes = [
    { value: "", label: "All Job Types" },
    { value: "full-time", label: "Full-time" },
    { value: "part-time", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
    { value: "remote", label: "Remote" }
  ];
  
  const experienceLevels = [
    { value: "", label: "All Experience Levels" },
    { value: "entry", label: "Entry Level" },
    { value: "mid", label: "Mid Level" },
    { value: "senior", label: "Senior Level" },
    { value: "lead", label: "Lead Level" },
    { value: "executive", label: "Executive" }
  ];
  
  const salaryRanges = [
    { value: "", label: "All Salaries" },
    { value: "30-50k", label: "$30k - $50k" },
    { value: "50-75k", label: "$50k - $75k" },
    { value: "75-100k", label: "$75k - $100k" },
    { value: "100-150k", label: "$100k - $150k" },
    { value: "150k+", label: "$150k+" }
  ];
  
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleClearFilters = () => {
    const clearedFilters = {
      location: "",
      industry: "",
      jobType: "",
      experience: "",
      salary: ""
    };
    setFilters(clearedFilters);
    onClearFilters();
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <ApperIcon name="Filter" className="w-5 h-5" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4">
        <FormField
          label="Location"
          type="text"
          placeholder="Enter city or state"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
        />
        
        <FormField
          label="Industry"
          type="select"
          options={industries}
          value={filters.industry}
          onChange={(e) => handleFilterChange("industry", e.target.value)}
        />
        
        <FormField
          label="Job Type"
          type="select"
          options={jobTypes}
          value={filters.jobType}
          onChange={(e) => handleFilterChange("jobType", e.target.value)}
        />
        
        <FormField
          label="Experience Level"
          type="select"
          options={experienceLevels}
          value={filters.experience}
          onChange={(e) => handleFilterChange("experience", e.target.value)}
        />
        
        <FormField
          label="Salary Range"
          type="select"
          options={salaryRanges}
          value={filters.salary}
          onChange={(e) => handleFilterChange("salary", e.target.value)}
        />
      </div>
    </motion.div>
  );
};

export default JobFilters;
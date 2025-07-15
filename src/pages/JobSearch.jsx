import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import JobFilters from "@/components/organisms/JobFilters";
import JobCard from "@/components/organisms/JobCard";
import JobModal from "@/components/organisms/JobModal";
import FilterChip from "@/components/molecules/FilterChip";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { jobService } from "@/services/api/jobService";
import { applicationService } from "@/services/api/applicationService";

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState("newest");
  
  const loadJobs = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await jobService.getAll();
      setJobs(data);
      setFilteredJobs(data);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadJobs();
  }, []);
  
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    
    let filtered = jobs;
    
    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    // Apply industry filter
    if (filters.industry) {
      filtered = filtered.filter(job =>
        job.industry.toLowerCase() === filters.industry.toLowerCase()
      );
    }
    
    // Apply job type filter
    if (filters.jobType) {
      filtered = filtered.filter(job =>
        job.type.toLowerCase() === filters.jobType.toLowerCase()
      );
    }
    
    // Apply experience filter
    if (filters.experience) {
      filtered = filtered.filter(job =>
        job.requirements.some(req =>
          req.toLowerCase().includes(filters.experience.toLowerCase())
        )
      );
    }
    
    // Apply salary filter
    if (filters.salary) {
      // This would need more sophisticated salary parsing in a real app
      filtered = filtered.filter(job => {
        const salaryText = job.salary.toLowerCase();
        const range = filters.salary;
        
        if (range === "30-50k") return salaryText.includes("30") || salaryText.includes("40") || salaryText.includes("50");
        if (range === "50-75k") return salaryText.includes("50") || salaryText.includes("60") || salaryText.includes("70");
        if (range === "75-100k") return salaryText.includes("75") || salaryText.includes("80") || salaryText.includes("90") || salaryText.includes("100");
        if (range === "100-150k") return salaryText.includes("100") || salaryText.includes("120") || salaryText.includes("130") || salaryText.includes("150");
        if (range === "150k+") return salaryText.includes("150") || salaryText.includes("200");
        
        return true;
      });
    }
    
    setFilteredJobs(filtered);
  };
  
  const handleClearFilters = () => {
    setActiveFilters({});
    setFilteredJobs(jobs);
  };
  
  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    
    let sorted = [...filteredJobs];
    
    switch (newSortBy) {
      case "newest":
        sorted.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case "oldest":
        sorted.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
        break;
      case "company":
        sorted.sort((a, b) => a.company.localeCompare(b.company));
        break;
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    
    setFilteredJobs(sorted);
  };
  
  const handleApply = async (job) => {
    try {
      const application = {
        jobId: job.Id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        appliedDate: new Date().toISOString(),
        status: "applied",
        notes: "",
        nextStep: "Wait for response"
      };
      
      await applicationService.create(application);
      toast.success(`Applied to ${job.title} at ${job.company}!`);
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to submit application. Please try again.");
    }
  };
  
  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };
  
  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => value && value.trim() !== "").length;
  };
  
  const getFilterChips = () => {
    const chips = [];
    
    if (activeFilters.location) {
      chips.push({ key: "location", label: `Location: ${activeFilters.location}` });
    }
    if (activeFilters.industry) {
      chips.push({ key: "industry", label: `Industry: ${activeFilters.industry}` });
    }
    if (activeFilters.jobType) {
      chips.push({ key: "jobType", label: `Type: ${activeFilters.jobType}` });
    }
    if (activeFilters.experience) {
      chips.push({ key: "experience", label: `Experience: ${activeFilters.experience}` });
    }
    if (activeFilters.salary) {
      chips.push({ key: "salary", label: `Salary: ${activeFilters.salary}` });
    }
    
    return chips;
  };
  
  const removeFilter = (filterKey) => {
    const newFilters = { ...activeFilters };
    delete newFilters[filterKey];
    setActiveFilters(newFilters);
    handleFilterChange(newFilters);
  };
  
  if (loading) {
    return <Loading type="jobs" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadJobs} />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <JobFilters
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                Job Search
              </h1>
              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all duration-200"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="company">Company A-Z</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <span>
                {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} found
                {getActiveFilterCount() > 0 && ` (${getActiveFilterCount()} filter${getActiveFilterCount() !== 1 ? "s" : ""} applied)`}
              </span>
            </div>
            
            {/* Active Filters */}
            {getFilterChips().length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {getFilterChips().map((chip) => (
                  <FilterChip
                    key={chip.key}
                    label={chip.label}
                    onRemove={() => removeFilter(chip.key)}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Job Results */}
          {filteredJobs.length === 0 ? (
            <Empty
              title="No jobs found"
              message="Try adjusting your filters or search criteria to find relevant opportunities."
              actionText="Clear Filters"
              onAction={handleClearFilters}
              icon="Search"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.Id}
                  job={job}
                  onApply={handleApply}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Job Details Modal */}
      <JobModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleApply}
      />
    </div>
  );
};

export default JobSearch;
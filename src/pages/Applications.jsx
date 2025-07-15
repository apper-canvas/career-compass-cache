import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import ApplicationsTable from "@/components/organisms/ApplicationsTable";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { applicationService } from "@/services/api/applicationService";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const loadApplications = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await applicationService.getAll();
      setApplications(data);
    } catch (err) {
      setError("Failed to load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadApplications();
  }, []);
  
  const handleViewDetails = (application) => {
    // In a real app, this would open a detailed view
    console.log("View details for:", application);
    toast.info("Application details feature coming soon!");
  };
  
  const handleWithdraw = async (application) => {
    try {
      await applicationService.delete(application.Id);
      setApplications(prev => prev.filter(app => app.Id !== application.Id));
      toast.success("Application withdrawn successfully");
    } catch (err) {
      toast.error("Failed to withdraw application. Please try again.");
    }
  };
  
  const getFilteredApplications = () => {
    if (filterStatus === "all") return applications;
    return applications.filter(app => app.status === filterStatus);
  };
  
  const getStatusCounts = () => {
    return {
      all: applications.length,
      applied: applications.filter(app => app.status === "applied").length,
      interviewing: applications.filter(app => app.status === "interviewing").length,
      offered: applications.filter(app => app.status === "offered").length,
      rejected: applications.filter(app => app.status === "rejected").length
    };
  };
  
  const statusCounts = getStatusCounts();
  const filteredApplications = getFilteredApplications();
  
  if (loading) {
    return <Loading type="applications" />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadApplications} />;
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          My Applications
        </h1>
        <p className="text-gray-600">
          Track and manage your job applications
        </p>
      </div>
      
      {/* Status Filter Tabs */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          {[
            { key: "all", label: "All Applications", count: statusCounts.all },
            { key: "applied", label: "Applied", count: statusCounts.applied },
            { key: "interviewing", label: "Interviewing", count: statusCounts.interviewing },
            { key: "offered", label: "Offered", count: statusCounts.offered },
            { key: "rejected", label: "Rejected", count: statusCounts.rejected }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilterStatus(tab.key)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                filterStatus === tab.key
                  ? "text-primary-600 border-b-2 border-primary-600 bg-primary-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>
      
      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <Empty
          title="No applications found"
          message={
            filterStatus === "all"
              ? "You haven't applied to any jobs yet. Start searching for opportunities!"
              : `No applications with status "${filterStatus}" found.`
          }
          actionText="Find Jobs"
          onAction={() => window.location.href = "/"}
          icon="FileText"
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <ApplicationsTable
            applications={filteredApplications}
            onViewDetails={handleViewDetails}
            onWithdraw={handleWithdraw}
          />
        </motion.div>
      )}
    </div>
  );
};

export default Applications;
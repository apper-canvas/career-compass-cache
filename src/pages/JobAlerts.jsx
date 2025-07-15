import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { format } from "date-fns";
import JobAlertForm from "@/components/organisms/JobAlertForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import { jobAlertService } from "@/services/api/jobAlertService";

const JobAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const loadAlerts = async () => {
    setLoading(true);
    setError("");
    
    try {
      const data = await jobAlertService.getAll();
      setAlerts(data);
    } catch (err) {
      setError("Failed to load job alerts. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    loadAlerts();
  }, []);
  
  const handleSave = async (alertData) => {
    try {
      const newAlert = await jobAlertService.create(alertData);
      setAlerts(prev => [...prev, newAlert]);
    } catch (err) {
      toast.error("Failed to create job alert. Please try again.");
    }
  };
  
  const handleToggleActive = async (alertId) => {
    try {
      const alert = alerts.find(a => a.Id === alertId);
      const updatedAlert = { ...alert, isActive: !alert.isActive };
      
      await jobAlertService.update(alertId, updatedAlert);
      setAlerts(prev => prev.map(a => a.Id === alertId ? updatedAlert : a));
      
      toast.success(
        updatedAlert.isActive 
          ? "Job alert activated!" 
          : "Job alert paused!"
      );
    } catch (err) {
      toast.error("Failed to update job alert. Please try again.");
    }
  };
  
  const handleDelete = async (alertId) => {
    try {
      await jobAlertService.delete(alertId);
      setAlerts(prev => prev.filter(alert => alert.Id !== alertId));
      toast.success("Job alert deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete job alert. Please try again.");
    }
  };
  
  if (loading) {
    return <Loading />;
  }
  
  if (error) {
    return <Error message={error} onRetry={loadAlerts} />;
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Job Alerts
        </h1>
        <p className="text-gray-600">
          Create alerts to get notified about new job opportunities
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Create Alert Form */}
        <div>
          <JobAlertForm onSave={handleSave} />
        </div>
        
        {/* Active Alerts */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Alerts
          </h2>
          
          {alerts.length === 0 ? (
            <Empty
              title="No job alerts created"
              message="Create your first job alert to get notified about relevant opportunities."
              actionText="Create Alert"
              onAction={() => document.querySelector('input[type="text"]')?.focus()}
              icon="Bell"
            />
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-lg shadow-lg p-4 border ${
                    alert.isActive ? "border-primary-500 bg-primary-50" : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Bell" className="w-4 h-4 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {alert.keywords.join(", ")}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Created {format(new Date(alert.createdDate), "MMM dd, yyyy")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {alert.isActive ? (
                        <Badge variant="success">Active</Badge>
                      ) : (
                        <Badge variant="error">Paused</Badge>
                      )}
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleActive(alert.Id)}
                        title={alert.isActive ? "Pause Alert" : "Activate Alert"}
                      >
                        <ApperIcon 
                          name={alert.isActive ? "Pause" : "Play"} 
                          className="w-4 h-4" 
                        />
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(alert.Id)}
                        title="Delete Alert"
                        className="text-red-600 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    {alert.locations.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
                        <span>{alert.locations.join(", ")}</span>
                      </div>
                    )}
                    
                    {alert.industries.length > 0 && (
                      <div className="flex items-center text-gray-600">
                        <ApperIcon name="Briefcase" className="w-4 h-4 mr-1" />
                        <span>{alert.industries.join(", ")}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center text-gray-600">
                      <ApperIcon name="Clock" className="w-4 h-4 mr-1" />
                      <span className="capitalize">{alert.frequency}</span>
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

export default JobAlerts;
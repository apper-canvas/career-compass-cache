import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const JobModal = ({ job, isOpen, onClose, onApply }) => {
  if (!isOpen || !job) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {job.title}
              </h2>
              <div className="flex items-center text-gray-600 mb-2">
                <ApperIcon name="Building" className="w-5 h-5 mr-2" />
                <span className="font-medium text-lg">{job.company}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-4">
                <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{job.type}</Badge>
                <Badge variant="success">{job.industry}</Badge>
                <span className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="ml-4"
            >
              <ApperIcon name="X" className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ApperIcon name="DollarSign" className="w-5 h-5 text-primary-600" />
              <span className="text-xl font-bold text-primary-600">
                {job.salary}
              </span>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ApperIcon name="FileText" className="w-5 h-5" />
              Job Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {job.description}
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <ApperIcon name="CheckCircle" className="w-5 h-5" />
              Requirements
            </h3>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, index) => (
                <Badge key={index} variant="default">
                  {req}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
            <Button
              onClick={() => onApply(job)}
              className="flex items-center gap-2 flex-1"
            >
              <ApperIcon name="Send" className="w-4 h-4" />
              Apply Now
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Bookmark" className="w-4 h-4" />
              Save Job
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobModal;
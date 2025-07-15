import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const JobCard = ({ job, onApply, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card card-hover p-6 cursor-pointer"
      onClick={() => onViewDetails(job)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <ApperIcon name="Building" className="w-4 h-4 mr-2" />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-3">
            <ApperIcon name="MapPin" className="w-4 h-4 mr-2" />
            <span>{job.location}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <Badge variant="secondary" className="mb-2">
            {job.type}
          </Badge>
          <span className="text-sm text-gray-500">
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-700 line-clamp-3 mb-3">
          {job.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-3">
          {job.requirements.slice(0, 3).map((req, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {req}
            </Badge>
          ))}
          {job.requirements.length > 3 && (
            <Badge variant="default" className="text-xs">
              +{job.requirements.length - 3} more
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-lg font-bold text-primary-600">
            {job.salary}
          </span>
          <Badge variant="success" className="text-xs">
            {job.industry}
          </Badge>
        </div>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onApply(job);
          }}
          className="flex items-center gap-2"
        >
          <ApperIcon name="Send" className="w-4 h-4" />
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
};

export default JobCard;
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  message = "Try adjusting your filters or search criteria",
  actionText = "Reset Filters",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name={icon} className="w-10 h-10 text-gray-400" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onAction && (
          <button
            onClick={onAction}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            {actionText}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Empty;
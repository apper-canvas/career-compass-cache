import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <div className="text-center max-w-md">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="AlertCircle" className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <ApperIcon name="RotateCcw" className="w-4 h-4" />
            Try Again
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Error;
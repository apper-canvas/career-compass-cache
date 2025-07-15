import { motion } from "framer-motion";

const Loading = ({ type = "default" }) => {
  if (type === "jobs") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-100"
          >
            <div className="shimmer h-6 w-3/4 rounded mb-3"></div>
            <div className="shimmer h-4 w-1/2 rounded mb-4"></div>
            <div className="shimmer h-4 w-full rounded mb-2"></div>
            <div className="shimmer h-4 w-full rounded mb-2"></div>
            <div className="shimmer h-4 w-2/3 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="shimmer h-5 w-20 rounded"></div>
              <div className="shimmer h-10 w-24 rounded"></div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "applications") {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="shimmer h-8 w-48 rounded mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                <div className="flex-1">
                  <div className="shimmer h-5 w-1/3 rounded mb-2"></div>
                  <div className="shimmer h-4 w-1/4 rounded mb-2"></div>
                  <div className="shimmer h-4 w-1/6 rounded"></div>
                </div>
                <div className="shimmer h-6 w-20 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
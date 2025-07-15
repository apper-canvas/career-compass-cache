import { motion } from "framer-motion";
import { format } from "date-fns";
import StatusBadge from "@/components/molecules/StatusBadge";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ApplicationsTable = ({ applications, onViewDetails, onWithdraw }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Step
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {applications.map((application, index) => (
              <motion.tr
                key={application.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {application.jobTitle}
                  </div>
                  <div className="text-sm text-gray-500">
                    {application.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">
                    {application.company}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(application.appliedDate), "MMM dd, yyyy")}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={application.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {application.nextStep}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onViewDetails(application)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <ApperIcon name="Eye" className="w-4 h-4" />
                    </Button>
                    {application.status === "applied" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onWithdraw(application)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <ApperIcon name="Trash2" className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
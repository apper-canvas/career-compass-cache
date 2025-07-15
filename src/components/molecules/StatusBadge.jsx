import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const StatusBadge = ({ status }) => {
  const statusConfig = {
    applied: {
      variant: "applied",
      icon: "Send",
      text: "Applied"
    },
    interviewing: {
      variant: "interviewing",
      icon: "Calendar",
      text: "Interviewing"
    },
    offered: {
      variant: "offered",
      icon: "CheckCircle",
      text: "Offered"
    },
    rejected: {
      variant: "rejected",
      icon: "XCircle",
      text: "Rejected"
    }
  };
  
  const config = statusConfig[status] || statusConfig.applied;
  
  return (
    <Badge variant={config.variant} className="inline-flex items-center gap-1">
      <ApperIcon name={config.icon} className="w-3 h-3" />
      {config.text}
    </Badge>
  );
};

export default StatusBadge;
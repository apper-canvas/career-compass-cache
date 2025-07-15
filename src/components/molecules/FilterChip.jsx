import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const FilterChip = ({ 
  label, 
  onRemove, 
  className,
  removable = true 
}) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium",
      className
    )}>
      <span>{label}</span>
      {removable && (
        <button
          onClick={onRemove}
          className="hover:bg-primary-200 rounded-full p-1 transition-colors"
        >
          <ApperIcon name="X" className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};

export default FilterChip;
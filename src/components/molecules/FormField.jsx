import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import { cn } from "@/utils/cn";

const FormField = ({ 
  label, 
  type = "text", 
  error, 
  className,
  options = [],
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      
      {type === "select" ? (
        <Select {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input type={type} {...props} />
      )}
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField;
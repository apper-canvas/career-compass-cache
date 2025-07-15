import { useState } from "react";
import Input from "@/components/atoms/Input";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const SearchBar = ({ 
  placeholder = "Search jobs...", 
  onSearch,
  className,
  value,
  onChange
}) => {
  const [searchTerm, setSearchTerm] = useState(value || "");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(searchTerm);
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange?.(newValue);
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="pl-12"
        />
        <ApperIcon 
          name="Search" 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
        />
      </div>
      <Button type="submit">
        <ApperIcon name="Search" className="w-4 h-4" />
      </Button>
    </form>
  );
};

export default SearchBar;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import SearchBar from "@/components/molecules/SearchBar";
import Button from "@/components/atoms/Button";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navigationItems = [
    { path: "/", label: "Job Search", icon: "Search" },
    { path: "/applications", label: "My Applications", icon: "FileText" },
    { path: "/resume", label: "Resume", icon: "User" },
    { path: "/alerts", label: "Job Alerts", icon: "Bell" }
  ];
  
  const handleSearch = (searchTerm) => {
    // This would typically update the global search state
    console.log("Search:", searchTerm);
  };
  
  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <ApperIcon name="Compass" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">CareerCompass</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
              >
                <ApperIcon name={item.icon} className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar
              placeholder="Search jobs..."
              onSearch={handleSearch}
            />
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="lg:hidden py-4 border-t border-gray-100">
          <SearchBar
            placeholder="Search jobs..."
            onSearch={handleSearch}
          />
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-100"
        >
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  location.pathname === item.path
                    ? "text-primary-600 bg-primary-50"
                    : "text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ApperIcon name={item.icon} className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
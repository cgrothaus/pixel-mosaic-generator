
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, variant = 'primary', fullWidth = false }) => {
  const baseClasses = "font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200";
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 focus:ring-gray-400",
  };
  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button onClick={onClick} className={`${baseClasses} ${variantClasses[variant]} ${widthClass}`}>
      {children}
    </button>
  );
};

export default Button;

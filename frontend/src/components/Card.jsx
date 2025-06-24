import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  padding = 'md',
  borderRadius = 'lg',
  ...props 
}) => {
  const baseStyles = 'bg-white transition-all duration-200 ease-out';
  
  const variants = {
    default: 'border border-gray-100 shadow-sm hover:shadow-md',
    elevated: 'shadow-lg hover:shadow-xl border-0',
    outlined: 'border-2 border-gray-200 shadow-none hover:border-gray-300',
    ghost: 'border-0 shadow-none bg-gray-50/50 hover:bg-gray-50',
    gradient: 'border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 hover:shadow-xl',
    glass: 'border border-white/20 shadow-lg backdrop-blur-sm bg-white/80 hover:bg-white/90',
    subtle: 'border border-gray-50 shadow-sm bg-gray-50/30 hover:bg-white hover:shadow-md'
  };

  const paddings = {
    none: 'p-0',
    xs: 'p-3',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  const radiusOptions = {
    none: 'rounded-none',
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-3xl',
    full: 'rounded-full'
  };

  const hoverEffects = hover ? 'hover:-translate-y-1 hover:scale-[1.02] cursor-pointer' : '';

  return (
    <div 
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${radiusOptions[borderRadius]}
        ${hoverEffects}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header Component
const CardHeader = ({ children, className = '', ...props }) => (
  <div 
    className={`border-b border-gray-100 pb-4 mb-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Body Component  
const CardBody = ({ children, className = '', ...props }) => (
  <div 
    className={`${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Footer Component
const CardFooter = ({ children, className = '', ...props }) => (
  <div 
    className={`border-t border-gray-100 pt-4 mt-6 ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Card Title Component
const CardTitle = ({ children, className = '', level = 2, ...props }) => {
  const Tag = `h${level}`;
  const textSizes = {
    1: 'text-2xl',
    2: 'text-xl',
    3: 'text-lg',
    4: 'text-base',
    5: 'text-sm',
    6: 'text-xs'
  };
  
  return (
    <Tag 
      className={`font-semibold text-gray-900 ${textSizes[level]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Card Description Component
const CardDescription = ({ children, className = '', ...props }) => (
  <p 
    className={`text-sm text-gray-600 leading-relaxed ${className}`}
    {...props}
  >
    {children}
  </p>
);

// Compound component pattern
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
Card.Description = CardDescription;

export default Card;
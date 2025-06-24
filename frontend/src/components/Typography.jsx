import React from 'react';


// Typography Component
const Typography = ({ variant = 'body', children, className = '', ...props }) => {
    const variants = {
        h1: 'text-3xl font-bold tracking-tight',
        h2: 'text-2xl font-semibold tracking-tight',
        h3: 'text-xl font-semibold tracking-tight',
        h4: 'text-lg font-semibold',
        body: 'text-base font-normal',
        caption: 'text-sm font-medium',
        small: 'text-xs font-normal'
  };

    const Component = variant.startsWith('h') ? variant : 'p';

    return (
        <Component 
        className={`${variants[variant]} ${className}`} 
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
        {...props}
        >
        {children}
        </Component>
    );
};

export default Typography;
import React from 'react';

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
}) => (
  <div className="space-y-2 relative">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>

    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          transition-all duration-200 bg-white/80 backdrop-blur-sm`}
      />

      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
    </div>
  </div>
);

export default FormInput;

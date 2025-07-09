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
  disabled = false,
  errorMessage,
}) => (
  <div className="space-y-2 relative w-full min-w-[250px]">
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
        disabled={disabled}
        readOnly={disabled}
        className={`w-full px-4 py-3 pr-10 border rounded-lg
          transition-all duration-200 bg-white/80 backdrop-blur-sm
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${errorMessage ? "border-red-600 bg-red-50" : "border-gray-300"}
        `}
      />

      {icon && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {icon}
        </div>
      )}
    </div>

    {errorMessage && (
      <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
    )}
  </div>
);

export default FormInput;

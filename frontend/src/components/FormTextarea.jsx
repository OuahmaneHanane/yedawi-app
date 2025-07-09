import React from "react";

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder = "",
  disabled = false, // ✅ Fix: declare it here
  errorMessage,
}) => {
  return (
    <div className="w-full min-w-[250px] space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={disabled}
        className={`w-full border p-2 rounded
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${errorMessage ? "border-red-600 bg-red-50" : "border-gray-300"}
        `}
      />
      {errorMessage && (
        <p className="text-sm text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default FormTextarea;

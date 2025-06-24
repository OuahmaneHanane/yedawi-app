import React from "react";

const FormTextarea = ({ label, name, value, onChange, rows = 3, placeholder = "" }) => {
  return (
    <label className="block mb-2">
      {label}
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full border p-2 rounded"
      />
    </label>
  );
};

export default FormTextarea;

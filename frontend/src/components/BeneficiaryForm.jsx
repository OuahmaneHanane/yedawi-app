import React, { useState } from "react";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import SubmitButton from "./SubmitButton";

const BeneficiaryForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    age: "",
    assistanceType: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if (formData.age < 0) {
    alert('Age cannot be negative.');
    return;
  }

  // continue submission
  console.log('Form submitted:', formData);
    // TODO: handle API submission here
  };

  const [selectedFile, setSelectedFile] = useState(null);

const handleFileChange = (e) => {
  setSelectedFile(e.target.files[0]);
};

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl min-h-[600px] mx-auto p-6 bg-white rounded shadow space-y-6">
  <h2 className="text-2xl font-semibold mb-6 text-center">Beneficiary Request</h2>

  {/* Row 1 */}
  <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[250px]">
      <FormInput
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
    </div>

    <div className="flex-1 min-w-[250px]">
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>
  </div>

  {/* Row 2 */}
  <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[250px]">
      <FormInput
        label="Phone Number"
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
    </div>

    <div className="flex-1 min-w-[250px]">
      <FormInput
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
    </div>

    <div className="flex-1 min-w-[150px]">
      <FormInput
        label="Age"
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        min="0"
      />
    </div>
  </div>

  <div className="flex-1 min-w-[150px]">
    <FormInput
     label="Upload Supporting Document"
     type="file"
     name="supportingDocument"
     onChange={handleFileChange}
  />
  </div>

  {/* Row 3 */}
  <div className="flex flex-wrap gap-4">
    <div className="flex-1 min-w-[300px]">
      <FormTextarea
        label="Type of Assistance Needed"
        name="assistanceType"
        value={formData.assistanceType}
        onChange={handleChange}
        placeholder="Describe the assistance you need"
      />
    </div>

    <div className="flex-1 min-w-[300px]">
      <FormTextarea
        label="Additional Notes (Optional)"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        rows={2}
      />
    </div>
  </div>

  {/* Submit Button */}
  <div className="flex justify-center mt-4">
    <SubmitButton text="Send Request" />
  </div>
</form>
  );
};

export default BeneficiaryForm;

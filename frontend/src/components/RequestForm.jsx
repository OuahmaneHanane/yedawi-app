import React, { useState } from "react";
import axios from "axios";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import SubmitButton from "./SubmitButton";

const RequestForm = ({ userData = {} }) => {
  const [formData, setFormData] = useState({
    fullName: userData.fullName || "",
    email: userData.email || "",
    phone: "",
    address: "",
    nationalId: "",
    age: "",
    assistanceType: "",
    notes: "",
    beneficiaryName: "",
    beneficiaryAge: "",
    relationship: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
      const maxSizeMB = 5;
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          supportingDocument: "Only JPG, PNG, or PDF files are allowed.",
        }));
        setSelectedFile(null);
        return;
      }
      if (file.size / 1024 / 1024 > maxSizeMB) {
        setErrors((prev) => ({
          ...prev,
          supportingDocument: "File size must be under 5MB.",
        }));
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setErrors((prev) => ({ ...prev, supportingDocument: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required.";

    if (!formData.nationalId.trim()) {
      newErrors.nationalId = "National ID is required.";
    }

    if (formData.phone.trim()) {
      if (!/^\+?\d{7,15}$/.test(formData.phone.trim())) {
        newErrors.phone = "Invalid phone number.";
      }
    }

    if (formData.age !== "" && Number(formData.age) < 0) {
      newErrors.age = "Age cannot be negative.";
    }

    if (!formData.beneficiaryName.trim())
      newErrors.beneficiaryName = "Beneficiary name is required.";

    if (formData.beneficiaryAge === "" || Number(formData.beneficiaryAge) < 0) {
      newErrors.beneficiaryAge = "Beneficiary age must be zero or more.";
    }

    if (!formData.relationship) {
      newErrors.relationship = "Relationship is required.";
    }

    if (!formData.assistanceType.trim())
      newErrors.assistanceType = "Please describe the assistance needed.";

    if (selectedFile === null) {
      newErrors.supportingDocument = "Supporting document is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsSubmitting(true);

  try {
    const submissionData = new FormData();
    for (const key in formData) {
      submissionData.append(key, formData[key]);
    }
    if (selectedFile) {
      submissionData.append("supportingDocument", selectedFile);
    }

    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/requests",
      submissionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Request submitted successfully!");
    // Reset form only after success
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      address: "",
      nationalId: "",
      age: "",
      assistanceType: "",
      notes: "",
      beneficiaryName: "",
      beneficiaryAge: "",
      relationship: "",
    });
    setSelectedFile(null);
    setErrors({});
  } catch (error) {
    console.error("Submission error:", error);
    alert(
      error.response?.data?.message ||
        "Failed to submit the form. Please try again."
    );
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl min-h-[650px] mx-auto p-6 bg-white rounded shadow space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Beneficiary Request</h2>

      {/* Requester Information */}
      <h3 className="text-lg font-semibold">Requester Information</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label={<><span className="text-red-600">*</span> Full Name</>}
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            errorMessage={errors.fullName}
            aria-invalid={!!errors.fullName}
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label={<><span className="text-red-600">*</span> Email</>}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            errorMessage={errors.email}
            aria-invalid={!!errors.email}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label="Phone Number"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            errorMessage={errors.phone}
            aria-invalid={!!errors.phone}
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label={<><span className="text-red-600">*</span> Address</>}
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            errorMessage={errors.address}
            aria-invalid={!!errors.address}
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label={<><span className="text-red-600">*</span> National ID</>}
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={handleChange}
            required
            errorMessage={errors.nationalId}
            aria-invalid={!!errors.nationalId}
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <FormInput
            label="Your Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            errorMessage={errors.age}
            aria-invalid={!!errors.age}
          />
        </div>
      </div>

      {/* Beneficiary Details */}
      <h3 className="text-lg font-semibold mt-8 mb-2">Beneficiary Information</h3>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[250px]">
          <FormInput
            label={
              <>
                Beneficiary Full Name <span className="text-red-600">*</span>
              </>
            }
            type="text"
            name="beneficiaryName"
            value={formData.beneficiaryName}
            onChange={handleChange}
            required
            errorMessage={errors.beneficiaryName}
            aria-invalid={!!errors.beneficiaryName}
          />
        </div>
        <div className="flex-1 min-w-[150px]">
          <FormInput
            label={
              <>
                Beneficiary Age <span className="text-red-600">*</span>
              </>
            }
            type="number"
            name="beneficiaryAge"
            value={formData.beneficiaryAge}
            onChange={handleChange}
            min="0"
            required
            errorMessage={errors.beneficiaryAge}
            aria-invalid={!!errors.beneficiaryAge}
          />
        </div>
        <div className="flex-1 min-w-[250px]">
          <label
            htmlFor="relationship"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Relationship to Beneficiary <span className="text-red-600">*</span>
          </label>
          <select
            id="relationship"
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className={`w-full border rounded-md shadow-sm focus:ring-green-400 focus:border-green-400 ${
              errors.relationship ? "border-red-600" : "border-gray-300"
            }`}
            required
            aria-invalid={!!errors.relationship}
            aria-describedby={errors.relationship ? "error-relationship" : undefined}
          >
            <option value="">Select</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="spouse">Spouse</option>
            <option value="child">Child</option>
            <option value="sibling">Sibling</option>
            <option value="guardian">Guardian</option>
            <option value="other">Other</option>
          </select>
          {errors.relationship && (
            <p
              className="mt-1 text-red-600 text-sm"
              id="error-relationship"
              role="alert"
            >
              {errors.relationship}
            </p>
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="flex-1 min-w-[250px]">
        <FormInput
          label={
            <>
              Upload Supporting Document <span className="text-red-600">*</span>
            </>
          }
          type="file"
          name="supportingDocument"
          onChange={handleFileChange}
          errorMessage={errors.supportingDocument}
          aria-invalid={!!errors.supportingDocument}
        />
        {selectedFile && (
          <p className="mt-1 text-gray-600 text-sm">Selected file: {selectedFile.name}</p>
        )}
      </div>

      {/* Assistance Section */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[300px]">
          <FormTextarea
            label={
              <>
                Type of Assistance Needed <span className="text-red-600">*</span>
              </>
            }
            name="assistanceType"
            value={formData.assistanceType}
            onChange={handleChange}
            placeholder="Describe the assistance you need"
            errorMessage={errors.assistanceType}
            aria-invalid={!!errors.assistanceType}
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
        <SubmitButton loading={isSubmitting} text="Send Request" />
      </div>
    </form>
  );
};

export default RequestForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormInput from "./FormInput";
import FormTextarea from "./FormTextarea";
import SubmitButton from "./SubmitButton";

const RequestForm = () => {
  const [formData, setFormData] = useState({
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

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token");

        const { data } = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData((prev) => ({
          ...prev,
          fullName: data.name || "",
          email: data.email || "",
        }));
      } catch (err) {
        console.error("Could not load user profile", err);
      } finally {
        setIsLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    // Clear general submit error
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSizeMB = 5;

    if (!allowedTypes.includes(file.type)) {
      return setErrors((prev) => ({
        ...prev,
        supportingDocument: "Only JPG, PNG, or PDF files are allowed.",
      }));
    }

    if (file.size / 1024 / 1024 > maxSizeMB) {
      return setErrors((prev) => ({
        ...prev,
        supportingDocument: "File size must be under 5 MB.",
      }));
    }

    setSelectedFile(file);
    setErrors((prev) => ({ ...prev, supportingDocument: null }));
    // Clear general submit error
    if (submitError) {
      setSubmitError("");
    }
  };

  const validate = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.nationalId.trim()) newErrors.nationalId = "National ID is required.";

    // Email format validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone number validation (optional but if provided, must be valid)
    if (formData.phone.trim() && !/^\+?\d{7,15}$/.test(formData.phone.trim()))
      newErrors.phone = "Invalid phone number.";

    // Age validation (optional but if provided, must be valid)
    if (formData.age !== "" && Number(formData.age) < 0)
      newErrors.age = "Age cannot be negative.";

    // Beneficiary validations
    if (!formData.beneficiaryName.trim())
      newErrors.beneficiaryName = "Beneficiary name is required.";

    if (formData.beneficiaryAge === "" || Number(formData.beneficiaryAge) < 0)
      newErrors.beneficiaryAge = "Beneficiary age must be zero or more.";

    if (!formData.relationship)
      newErrors.relationship = "Relationship is required.";

    if (!formData.assistanceType.trim())
      newErrors.assistanceType = "Please describe the assistance needed.";

    if (!selectedFile)
      newErrors.supportingDocument = "Supporting document is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous submit error
    setSubmitError("");
    
    if (!validate()) {
      // Scroll to first error field
      const firstErrorField = document.querySelector('.border-red-600');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
      payload.append("supportingDocument", selectedFile);

      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/user/requests", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
    } catch (err) {
      console.error("Submit failed", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Unable to submit request. Please try again.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingUser) {
    return (
      <p className="text-center py-10 text-gray-500 animate-pulse">
        Loading user info…
      </p>
    );
  }

  if (success) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 Request Submitted Successfully!</h2>
          <p className="text-gray-700 mb-6">
            Your request has been submitted and will be reviewed shortly. 
            You'll receive updates via email.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-5xl min-h-[650px] mx-auto p-6 bg-white rounded shadow space-y-6"
      noValidate
    >
      <h2 className="text-2xl font-semibold mb-6 text-center">Beneficiary Request</h2>

      {/* General Error Message */}
      {submitError && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          <p className="font-medium">Error submitting request:</p>
          <p>{submitError}</p>
        </div>
      )}

      {/* Show validation errors summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          <p className="font-medium">Please fix the following errors:</p>
          <ul className="mt-2 list-disc list-inside space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <li key={field} className="text-sm">{error}</li>
            ))}
          </ul>
        </div>
      )}

      <h3 className="text-lg font-semibold">Requester Information</h3>
      <div className="flex flex-wrap gap-4">
        <FormInput 
          label="Full Name *" 
          name="fullName" 
          value={formData.fullName} 
          disabled 
          errorMessage={errors.fullName} 
        />
        <FormInput 
          label="Email *" 
          type="email" 
          name="email" 
          value={formData.email} 
          disabled 
          errorMessage={errors.email} 
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <FormInput 
          label="Phone Number" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          errorMessage={errors.phone} 
        />
        <FormInput 
          label="Address *" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
          errorMessage={errors.address} 
        />
        <FormInput 
          label="National ID *" 
          name="nationalId" 
          value={formData.nationalId} 
          onChange={handleChange} 
          errorMessage={errors.nationalId} 
        />
        <FormInput 
          label="Your Age" 
          type="number" 
          name="age" 
          value={formData.age} 
          onChange={handleChange} 
          errorMessage={errors.age} 
        />
      </div>

      <h3 className="text-lg font-semibold mt-8 mb-2">Beneficiary Information</h3>
      <div className="flex flex-wrap gap-4">
        <FormInput 
          label="Beneficiary Name *" 
          name="beneficiaryName" 
          value={formData.beneficiaryName} 
          onChange={handleChange} 
          errorMessage={errors.beneficiaryName} 
        />
        <FormInput 
          label="Beneficiary Age *" 
          type="number" 
          name="beneficiaryAge" 
          value={formData.beneficiaryAge} 
          onChange={handleChange} 
          errorMessage={errors.beneficiaryAge} 
        />

        <div className="flex-1 min-w-[250px]">
          <label className="block text-sm font-medium mb-1">Relationship to Beneficiary *</label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md shadow-sm focus:ring-green-400 focus:border-green-400 ${
              errors.relationship ? "border-red-600 bg-red-50" : "border-gray-300"
            }`}
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
          {errors.relationship && <p className="mt-1 text-red-600 text-sm">{errors.relationship}</p>}
        </div>
      </div>

      <FormInput
        label="Supporting Document *"
        type="file"
        name="supportingDocument"
        onChange={handleFileChange}
        errorMessage={errors.supportingDocument}
        accept=".jpg,.jpeg,.png,.pdf"
      />
      {selectedFile && (
        <p className="mt-1 text-gray-600 text-sm">
          Selected file: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}

      <div className="flex flex-wrap gap-4">
        <FormTextarea
          label="Type of Assistance Needed *"
          name="assistanceType"
          value={formData.assistanceType}
          onChange={handleChange}
          errorMessage={errors.assistanceType}
        />
        <FormTextarea
          label="Additional Notes (Optional)"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
      </div>

      <div className="flex justify-center mt-4">
        <SubmitButton loading={isSubmitting} text="Send Request" />
      </div>
    </form>
  );
};

export default RequestForm;
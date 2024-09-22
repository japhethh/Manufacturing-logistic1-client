import React, { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa"; // Using icons for errors and more

const RegistrationRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact: "",
    businessLicense: null,
    taxId: null,
    certification: null,
    category: "", // Added category for supplier
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Supplier name is required.";
    if (!formData.address) newErrors.address = "Address is required.";
    if (!formData.contact) newErrors.contact = "Contact details are required.";
    if (!formData.businessLicense)
      newErrors.businessLicense = "Business license is required.";
    if (!formData.taxId) newErrors.taxId = "Tax ID is required.";
    if (!formData.category)
      newErrors.category = "Supplier category is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true); // Start loading spinner
      setTimeout(() => {
        setSubmitted(true);
        setIsSubmitting(false); // Stop loading spinner
      }, 2000); // Simulate form submission delay
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-gray-50 to-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Supplier Registration
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6 relative">
        {/* Supplier Name */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">
            Supplier Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform duration-300"
            placeholder="Enter supplier name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FaExclamationCircle /> {errors.name}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform duration-300"
            placeholder="Enter address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FaExclamationCircle /> {errors.address}
            </p>
          )}
        </div>

        {/* Contact Details */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">
            Contact Details
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform duration-300"
            placeholder="Enter contact details"
          />
          {errors.contact && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FaExclamationCircle /> {errors.contact}
            </p>
          )}
        </div>

        {/* Supplier Category */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">
            Supplier Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform duration-300"
          >
            <option value="">Select Category</option>
            <option value="Manufacturer">Manufacturer</option>
            <option value="Distributor">Distributor</option>
            <option value="Service Provider">Service Provider</option>
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
              <FaExclamationCircle /> {errors.category}
            </p>
          )}
        </div>

        {/* Document Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Business License */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">
              Business License
            </label>
            <input
              type="file"
              name="businessLicense"
              onChange={handleFileChange}
              className="mt-2 block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {errors.businessLicense && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <FaExclamationCircle /> {errors.businessLicense}
              </p>
            )}
          </div>

          {/* Tax ID */}
          <div className="relative">
            <label className="block text-lg font-medium text-gray-700">
              Tax ID
            </label>
            <input
              type="file"
              name="taxId"
              onChange={handleFileChange}
              className="mt-2 block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {errors.taxId && (
              <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                <FaExclamationCircle /> {errors.taxId}
              </p>
            )}
          </div>
        </div>

        {/* Certification (Optional) */}
        <div className="relative">
          <label className="block text-lg font-medium text-gray-700">
            Certification (Optional)
          </label>
          <input
            type="file"
            name="certification"
            onChange={handleFileChange}
            className="mt-2 block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform duration-300 ${
              isSubmitting ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex justify-center items-center space-x-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </span>
            ) : (
              "Submit Registration"
            )}
          </button>
        </div>

        {/* Success Message */}
        {submitted && (
          <p className="mt-6 text-green-500 text-center font-semibold animate-pulse">
            Registration request submitted successfully!
          </p>
        )}
      </form>
    </div>
  );
};

export default RegistrationRequest;

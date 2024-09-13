import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="flex flex-col items-center max-w-4xl px-8 py-10 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-8 text-2xl font-bold text-center text-gray-800">Supplier Registration</h1>
      <form action="#" className="flex flex-col w-full gap-6">
        {/* Basic Information */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Basic Information</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label htmlFor="companyName" className="text-sm font-medium text-gray-700">Company Name:</label>
              <input 
                type="text" 
                id="companyName" 
                name="companyName" 
                className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="companyAddress" className="text-sm font-medium text-gray-700">Company Address:</label>
              <input 
                type="text" 
                id="companyAddress" 
                name="companyAddress" 
                placeholder="Street Address"
                className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input 
                type="text" 
                id="city" 
                name="city" 
                placeholder="City"
                className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input 
                type="text" 
                id="state" 
                name="state" 
                placeholder="State"
                className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input 
                type="text" 
                id="zipCode" 
                name="zipCode" 
                placeholder="ZIP Code"
                className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input 
                type="text" 
                id="country" 
                name="country" 
                placeholder="Country"
                className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="contactPerson" className="text-sm font-medium text-gray-700">Contact Person:</label>
            <input 
              type="text" 
              id="contactName" 
              name="contactName" 
              placeholder="Name"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type="email" 
              id="contactEmail" 
              name="contactEmail" 
              placeholder="Email"
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input 
              type="tel" 
              id="contactPhone" 
              name="contactPhone" 
              placeholder="Phone Number"
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </section>

        {/* Business Details */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Business Details</h2>

          <div className="flex flex-col">
            <label htmlFor="businessType" className="text-sm font-medium text-gray-700">Business Type:</label>
            <select 
              id="businessType" 
              name="businessType" 
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Business Type</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="distributor">Distributor</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="taxId" className="text-sm font-medium text-gray-700">Tax ID or VAT Number:</label>
            <input 
              type="text" 
              id="taxId" 
              name="taxId" 
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

        </section>

        {/* Compliance and Certifications */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Compliance and Certifications</h2>

          <div className="flex flex-col">
            <label htmlFor="certifications" className="text-sm font-medium text-gray-700">Certifications:</label>
            <input 
              type="text" 
              id="certifications" 
              name="certifications" 
              placeholder="List relevant certifications"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="complianceDocuments" className="text-sm font-medium text-gray-700">Compliance Documents:</label>
            <input 
              type="file" 
              id="complianceDocuments" 
              name="complianceDocuments" 
              className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              multiple
            />
          </div>
        </section>

        {/* Banking Information */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Banking Information</h2>

          <div className="flex flex-col">
            <label htmlFor="bankName" className="text-sm font-medium text-gray-700">Bank Name:</label>
            <input 
              type="text" 
              id="bankName" 
              name="bankName" 
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="accountNumber" className="text-sm font-medium text-gray-700">Account Number:</label>
            <input 
              type="text" 
              id="accountNumber" 
              name="accountNumber" 
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="swiftCode" className="text-sm font-medium text-gray-700">SWIFT/BIC Code:</label>
            <input 
              type="text" 
              id="swiftCode" 
              name="swiftCode" 
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </section>

        {/* Contractual Information */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Contractual Information</h2>

          <div className="flex flex-col">
            <label htmlFor="contractTerms" className="text-sm font-medium text-gray-700">Contract Terms:</label>
            <textarea 
              id="contractTerms" 
              name="contractTerms" 
              rows="3" 
              placeholder="Enter any specific terms or conditions"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="paymentTerms" className="text-sm font-medium text-gray-700">Preferred Payment Terms:</label>
            <input 
              type="text" 
              id="paymentTerms" 
              name="paymentTerms" 
              placeholder="Specify payment terms"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* Performance and Risk Management */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Performance and Risk Management</h2>

          <div className="flex flex-col">
            <label htmlFor="performanceMetrics" className="text-sm font-medium text-gray-700">Performance Metrics:</label>
            <input 
              type="text" 
              id="performanceMetrics" 
              name="performanceMetrics" 
              placeholder="Enter key performance indicators"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label htmlFor="riskAssessment" className="text-sm font-medium text-gray-700">Risk Assessment:</label>
            <textarea 
              id="riskAssessment" 
              name="riskAssessment" 
              rows="3" 
              placeholder="Assess potential risks"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </section>

        {/* Documents and Attachments */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Documents and Attachments</h2>

          <div className="flex flex-col">
            <label htmlFor="uploadDocuments" className="text-sm font-medium text-gray-700">Upload Documents:</label>
            <input 
              type="file" 
              id="uploadDocuments" 
              name="uploadDocuments" 
              multiple
              className="p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </section>

        {/* Approval Workflow */}
        <section className="flex gap-4 mt-6">
          <button 
            type="submit" 
            className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit for Review
          </button>
          <button 
            type="button" 
            className="px-4 py-2 font-medium text-blue-500 border border-blue-500 rounded-md shadow-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save as Draft
          </button>
        </section>

        {/* Additional Notes */}
        <section>
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Additional Notes</h2>

          <div className="flex flex-col">
            <label htmlFor="notes" className="text-sm font-medium text-gray-700">Notes:</label>
            <textarea 
              id="notes" 
              name="notes" 
              rows="3" 
              placeholder="Any additional information or comments"
              className="px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </section>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500">Already have an account? </span>
        <Link to="/" className="text-blue-500 hover:text-blue-600">Login</Link>
      </div>
    </div>
  );
}

export default Register;

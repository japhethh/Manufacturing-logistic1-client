import React, { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const ComplianceVerification = () => {
  const [legalCompliance, setLegalCompliance] = useState(false);
  const [financialRisk, setFinancialRisk] = useState('');
  const [sustainabilityEthics, setSustainabilityEthics] = useState(false);
  const [certifications, setCertifications] = useState('');
  const [backgroundCheck, setBackgroundCheck] = useState(false);
  const [ongoingCompliance, setOngoingCompliance] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // To handle submission feedback

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission success or failure
    setFormStatus('success');
  };

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Compliance Verification</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Legal Compliance */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Legal Compliance</span>
            <span className="tooltip tooltip-right" data-tip="Verify business licenses, tax compliance, and industry regulations">
              <FaExclamationTriangle className="text-warning" />
            </span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={legalCompliance}
              onChange={(e) => setLegalCompliance(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span>Business Licenses, Tax Compliance, Industry Regulations</span>
          </div>
        </div>

        {/* Financial Risk Assessment */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Financial Risk Assessment</span>
          </label>
          <select
            value={financialRisk}
            onChange={(e) => setFinancialRisk(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Risk Level</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        {/* Sustainability & Ethical Compliance */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Sustainability & Ethical Compliance</span>
            <span className="tooltip tooltip-right" data-tip="Check ethical standards, CSR initiatives, and sustainability practices">
              <FaExclamationTriangle className="text-warning" />
            </span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sustainabilityEthics}
              onChange={(e) => setSustainabilityEthics(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span>Ethical Standards, CSR, Sustainability</span>
          </div>
        </div>

        {/* Certifications Validation */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Certifications Validation</span>
          </label>
          <select
            value={certifications}
            onChange={(e) => setCertifications(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">Select Certification</option>
            <option value="ISO">ISO</option>
            <option value="environmental">Environmental Compliance</option>
            <option value="product">Product Quality Standards</option>
          </select>
        </div>

        {/* Background Check */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Background Check</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={backgroundCheck}
              onChange={(e) => setBackgroundCheck(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span>Legal Standing or Criminal Background</span>
          </div>
        </div>

        {/* Ongoing Compliance Monitoring */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Ongoing Compliance Monitoring</span>
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={ongoingCompliance}
              onChange={(e) => setOngoingCompliance(e.target.checked)}
              className="checkbox checkbox-primary"
            />
            <span>Ensure compliance post-onboarding</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center"
          >
            Submit Compliance Verification
          </button>
        </div>

        {/* Feedback Messages */}
        {formStatus === 'success' && (
          <div className="alert alert-success mt-4">
            <FaCheckCircle className="text-green-600 mr-2" />
            Compliance verification submitted successfully!
          </div>
        )}
        {formStatus === 'error' && (
          <div className="alert alert-error mt-4">
            <FaExclamationTriangle className="text-red-600 mr-2" />
            Submission failed. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default ComplianceVerification;

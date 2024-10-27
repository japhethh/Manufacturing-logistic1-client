import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiURL } from "../../context/Store";

const QCInspection = () => {
  const { invoiceId } = useParams();
  const [inspectionData, setInspectionData] = useState({
    inspectionId: "",
    productId: "",
    inspector: "",
    status: "",
    discrepancies: "",
  });
  const [defectData, setDefectData] = useState({
    defectDescription: "",
    severity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInspectionData({ ...inspectionData, [name]: value });
  };

  const handleDefectChange = (e) => {
    const { name, value } = e.target;
    setDefectData({ ...defectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Submit the QC Inspection
      const response = await axios.post(
        `${apiURL}/api/qualityControl/qc-inspections`,
        {
          ...inspectionData,
          invoiceId, // Include the invoiceId in the inspection data
        }
      );
      toast.success("QC inspection recorded successfully!");

      // Step 2: If there are defects, submit them
      if (defectData.defectDescription) {
        const defectResponse = await axios.post(
          `${apiURL}/api/qualityControl/defects`,
          {
            defectDescription: defectData.defectDescription,
            severity: defectData.severity,
            inspectionId: response.data.inspectionId, // Link defect to inspection
          }
        );
        toast.success("Defect reported successfully!");
      }

      // Optionally reset form here or redirect
      setInspectionData({
        inspectionId: "",
        productId: "",
        inspector: "",
        status: "",
        discrepancies: "",
      });
      setDefectData({
        defectDescription: "",
        severity: "",
      });
    } catch (error) {
      toast.error(
        "Error recording QC inspection: " + error?.response.data.message
      );
    }
  };

  return (
    <div className="p-16 max-w-6xl mx-auto bg-white rounded-lg shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center border-b-2 pb-4 border-gray-200">
        Quality Control Inspection for Invoice #{invoiceId}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="inspector">
              Inspector Name
            </label>
            <input
              type="text"
              name="inspector"
              id="inspector"
              placeholder="Enter Inspector Name"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="status">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="discrepancies">
            Discrepancies
          </label>
          <textarea
            name="discrepancies"
            id="discrepancies"
            placeholder="Describe any discrepancies"
            className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            onChange={handleInputChange}
          />
        </div>
        <h2 className="text-2xl font-bold mt-12 text-gray-800 text-center border-t-2 pt-4 border-gray-200">
          Defect Reporting
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="defectDescription">
              Defect Description
            </label>
            <textarea
              name="defectDescription"
              id="defectDescription"
              placeholder="Describe the defect"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleDefectChange}
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700" htmlFor="severity">
              Severity
            </label>
            <select
              name="severity"
              id="severity"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleDefectChange}
            >
              <option value="">Select Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1"
        >
          Submit Inspection
        </button>
      </form>
    </div>
  );
};

export default QCInspection;

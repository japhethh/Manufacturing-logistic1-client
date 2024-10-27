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
    <div className="p-5 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">
        Quality Control Inspection for Invoice #{invoiceId}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="inspector">
            Inspector Name
          </label>
          <input
            type="text"
            name="inspector"
            id="inspector"
            placeholder="Enter Inspector Name"
            className="w-full p-2 border rounded-md"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="status">
            Status
          </label>
          <select
            name="status"
            id="status"
            className="w-full p-2 border rounded-md"
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="Pass">Pass</option>
            <option value="Fail">Fail</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="discrepancies"
          >
            Discrepancies
          </label>
          <textarea
            name="discrepancies"
            id="discrepancies"
            placeholder="Describe any discrepancies"
            className="w-full p-2 border rounded-md"
            onChange={handleInputChange}
          />
        </div>

        {/* Defect Reporting Section */}
        <h2 className="text-lg font-bold mt-6">Defect Reporting</h2>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="defectDescription"
          >
            Defect Description
          </label>
          <textarea
            name="defectDescription"
            id="defectDescription"
            placeholder="Describe the defect"
            className="w-full p-2 border rounded-md"
            onChange={handleDefectChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="severity">
            Severity
          </label>
          <select
            name="severity"
            id="severity"
            className="w-full p-2 border rounded-md"
            onChange={handleDefectChange}
          >
            <option value="">Select Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit Inspection
        </button>
      </form>
    </div>
  );
};

export default QCInspection;

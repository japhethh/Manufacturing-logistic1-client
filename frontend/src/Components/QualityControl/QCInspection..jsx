import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiURL } from "../../context/Store";
import { useNavigate } from "react-router-dom";
import Store from "../../context/Store";
const QCInspection = () => {
  const { invoiceId } = useParams();
  const [inspectionData, setInspectionData] = useState({
    productId: "",
    inspector: "",
    status: "",
    discrepancies: "",
  });
  const [defectData, setDefectData] = useState({
    defectDescription: "",
    severity: "",
    numberCode: "",
    images: [], // To hold multiple images
  });
  const { token } = Store();

  // Navigate
  const navigate = useNavigate();

  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset file input

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInspectionData({ ...inspectionData, [name]: value });
  };

  const handleDefectChange = (e) => {
    const { name, value } = e.target;
    setDefectData({ ...defectData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setDefectData({ ...defectData, images: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inspectionData);
      // Step 1: Submit the QC Inspection
      const response = await axios.post(
        `${apiURL}/api/qualityControl/qc-inspections`,
        {
          ...inspectionData,
          invoiceId,
        },
        { headers: { token: token } }
      );
      toast.success("QC inspection recorded successfully!");

      // Step 2: If there are defects, submit them
      if (defectData.defectDescription) {
        const formData = new FormData();
        formData.append("defectDescription", defectData.defectDescription);
        formData.append("inspector", inspectionData.inspector);
        formData.append("inspectionId", response.data.inspectionId);
        formData.append("severity", defectData.severity);
        formData.append("numberCode", defectData.numberCode);
        formData.append("invoiceId", response.data.invoiceId);

        // Append each image file to formData
        defectData.images.forEach((image) => {
          formData.append("images", image);
        });

        const defectResponse = await axios.post(
          `${apiURL}/api/qualityControl/defects`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              token: token,
            },
          }
        );
        toast.success("Defect reported successfully!");
      }

      navigate("/receiving");

      // Reset form fields
      setInspectionData({
        productId: "",
        inspector: "",
        status: "",
        discrepancies: "",
      });
      setDefectData({
        defectDescription: "",
        severity: "",
        numberCode: "",
        images: [],
      });
      setFileInputKey(Date.now()); // Reset file input by updating key
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
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="inspector"
            >
              Inspector Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="inspector"
              id="inspector"
              placeholder="Enter Inspector Name"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleInputChange}
              value={inspectionData.inspector}
              required
            />
          </div>
          <div>
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="status"
            >
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              id="status"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleInputChange}
              value={inspectionData.status}
              required
            >
              <option value="">Select Status</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>
        </div>
        <div>
          <label
            className="block text-lg font-medium mb-2 text-gray-700"
            htmlFor="discrepancies"
          >
            Discrepancies
          </label>
          <textarea
            name="discrepancies"
            id="discrepancies"
            placeholder="Describe any discrepancies"
            className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            onChange={handleInputChange}
            value={inspectionData.discrepancies}
          />
        </div>
        <h2 className="text-2xl font-bold mt-12 text-gray-800 text-center border-t-2 pt-4 border-gray-200">
          Defect Reporting
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="defectDescription"
            >
              Defect Description
            </label>
            <textarea
              name="defectDescription"
              id="defectDescription"
              placeholder="Describe the defect"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleDefectChange}
              value={defectData.defectDescription}
            />
          </div>
          <div>
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="severity"
            >
              Severity
            </label>
            <select
              name="severity"
              id="severity"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleDefectChange}
              value={defectData.severity}
            >
              <option value="">Select Severity</option>
              <option value="Minor">Low</option>
              <option value="Major">Medium</option>
              <option value="Critical">High</option>
            </select>
          </div>
          <div>
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="numberCode"
            >
              Number Code
            </label>
            <input
              type="text"
              name="numberCode"
              id="numberCode"
              placeholder="Enter Item Number Code"
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              onChange={handleDefectChange}
              value={defectData.numberCode}
            />
          </div>
          <div>
            <label
              className="block text-lg font-medium mb-2 text-gray-700"
              htmlFor="images"
            >
              Upload Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              key={fileInputKey} // Reset file input
              className="w-full px-6 py-3 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            />
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

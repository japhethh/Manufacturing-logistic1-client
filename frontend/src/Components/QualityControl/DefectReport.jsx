import  { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../context/Store";

const DefectReport = ({ inspectionId }) => {
  const [defectData, setDefectData] = useState({
    defectId: "",
    productId: "",
    inspectionId: inspectionId,
    description: "",
    severity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDefectData({ ...defectData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiURL}/api/defects`, defectData);
      toast.success("Defect reported successfully!");
      // Optionally reset form or close modal here
    } catch (error) {
      toast.error("Error reporting defect: " + error?.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Defect Description"
        onChange={handleInputChange}
        required
      />
      <select name="severity" onChange={handleInputChange} required>
        <option value="">Select Severity</option>
        <option value="Minor">Minor</option>
        <option value="Major">Major</option>
        <option value="Critical">Critical</option>
      </select>
      <button type="submit">Report Defect</button>
    </form>
  );
};

export default DefectReport;

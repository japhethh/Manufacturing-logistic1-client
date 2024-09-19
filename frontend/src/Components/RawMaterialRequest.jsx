import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

const RawMaterialRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creatingPO, setCreatingPO] = useState(false); // New state for PO creation
  const navigate = useNavigate(); // for navigation

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/rawmaterial/request"
        );
        setRequests(response.data);
      } catch (error) {
        setError(
          "Error fetching raw material requests. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleAutoFill = async (requestId) => {
    setCreatingPO(true); // Start loading when creating PO
    try {
      const request = requests.find((req) => req._id === requestId);
      if (!request) return;

      // Send the selected request to the backend to create a Purchase Order
      const response = await axios.post(
        "http://localhost:4000/api/purchaseorder/create",
        { request }
      );

      // Navigate to the newly created Purchase Order page for review/edit
      const purchaseOrderId = response.data._id; // Assuming the response returns the new PO ID
      navigate(`/purchase-order/${purchaseOrderId}`);
    } catch (error) {
      setError("Error creating purchase order. Please try again later.");
    } finally {
      setCreatingPO(false); // Stop loading after PO creation attempt
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-end w-full mb-4">
        <button className="px-4 py-2 text-sm rounded-full bg-blue-700 text-white">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="table w-full text-sm border table-xs">
            <thead>
              <tr className="text-gray-700 bg-stone-200">
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border">Requested Date</th>
                <th className="px-4 py-2 border">Requested Status</th>
                <th className="px-4 py-2 border">Requested By</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Material Name</th>
                <th className="px-4 py-2 border">Unit</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Supplier Name</th> {/* New column */}
                <th className="px-4 py-2 border">Price</th> {/* New column */}
                <th className="px-4 py-2 border">Finance Status</th> {/* Clearer column */}
                <th className="px-4 py-2 border">Remarks</th> {/* New column */}
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 font-bold border">{index + 1}</td>
                    <td className="px-4 py-2 border">{formatDate(request.requestDate)}</td>
                    <td className="px-4 py-2 border">{request.requestStatus}</td>
                    <td className="px-4 py-2 border">{request.requestedBy}</td>
                    <td className="px-4 py-2 border">{request.priority}</td>

                    {/* Material Name */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.materialName}</div>
                      ))}
                    </td>

                    {/* Unit */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.unit}</div>
                      ))}
                    </td>

                    {/* Quantity */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.quantity}</div>
                      ))}
                    </td>

                    {/* Supplier Name */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>
                          {material?.materialId?.supplier?.supplierName || "N/A"}
                        </div>
                      ))}
                    </td>

                    {/* Price */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>
                          {material?.materialId?.pricePerUnit
                            ? `$${material.materialId.pricePerUnit}`
                            : "N/A"}
                        </div>
                      ))}
                    </td>

                    {/* Financial Approval */}
                    <td className="px-4 py-2 border">
                      {request.financeApproval ? "Approved" : "Pending"}
                    </td>

                    {/* Remarks */}
                    <td className="px-4 py-2 border">{request.remarks || "No remarks"}</td>

                    {/* Action */}
                    <td className="px-4 py-2 border">
                      <button
                        className="px-4 py-2 text-sm rounded-full bg-green-700 text-white"
                        onClick={() => handleAutoFill(request._id)}
                        disabled={creatingPO}
                      >
                        {creatingPO ? "Creating PO..." : "Create PO"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="px-4 py-2 text-center border">
                    No requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RawMaterialRequest;

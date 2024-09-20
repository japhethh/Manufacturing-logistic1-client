import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // for navigation

const RawMaterialRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const handleAutoFill = (requestId) => {
    // Instead of creating the PO here, navigate to the edit page with the request ID
    navigate(`/purchase-order/edit/${requestId}`);
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
                {/* <th className="px-4 py-2 border">Supplier Name</th> */}
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Finance Status</th>
                <th className="px-4 py-2 border">Remarks</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.length > 0 ? (
                requests.map((request, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 font-bold border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {formatDate(request.requestDate)}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.requestStatus}
                    </td>
                    <td className="px-4 py-2 border">{request.requestedBy}</td>
                    <td className="px-4 py-2 border">{request.priority}</td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.materialName}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.unit}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>{material.quantity}</div>
                      ))}
                    </td>
                    {/* <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>
                          {material?.materialId?.supplier?.supplierName ||
                            "N/A"}
                        </div>
                      ))}
                    </td> */}
                    <td className="px-4 py-2 border">
                      {request.material.map((material, index) => (
                        <div key={index}>
                          {material?.materialId?.pricePerUnit
                            ? `$${material.materialId.pricePerUnit}`
                            : "N/A"}
                        </div>
                      ))}
                    </td>
                    <td className={`px-4 py-2 border text-white`}>
                      <h1
                        className={`rounded-full btn btn-ghost btn-xs ${
                          request?.financeApproval
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {request.financeApproval ? "Approved" : "Pending"}
                      </h1>
                    </td>
                    <td className="px-4 py-2 border">
                      {request.remarks || "No remarks"}
                    </td>
                    <td className="px-4 py-2 border">
                      <button
                        className="px-4 py-2 text-sm rounded-full bg-green-700 text-white"
                        onClick={() => handleAutoFill(request._id)}
                      >
                        Create PO
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

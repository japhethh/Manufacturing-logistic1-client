import axios from "axios";
import { useEffect, useState } from "react";

const RawMaterialRequest = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/rawmaterial/request"
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
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

                <th className="px-4 py-2 border">Material name</th>
                <th className="px-4 py-2 border">Unit</th>
                <th className="px-4 py-2 border">Quantity</th>

                <th className="px-4 py-2 border">Financial Approval</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 font-bold border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {formatDate(user.requestDate)}
                    </td>
                    <td className="px-4 py-2 border">{user.requestStatus}</td>
                    <td className="px-4 py-2 border">{user.requestedBy}</td>
                    <td className="px-4 py-2 border">{user.priority}</td>
                    <td className="px-4 py-2 border">
                      {user.material.map((material, index) => (
                        <div key={index}>{material.materialName}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {user.material.map((material, index) => (
                        <div key={index}>{material.unit}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">
                      {user.material.map((material, index) => (
                        <div key={index}>{material.quantity}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 border">{user.financeApproval}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-4 py-2 text-center border">
                    No users found
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

import axios from "axios";
import { useEffect, useState } from "react";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/supplier/suppliers"
        );
        setSuppliers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching suppliers. Please try again later.");
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
    <div className="p-4">
      <div className="flex justify-end w-full mb-2">
        <button className="px-3 py-2 text-blue-700 duration-150 border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="table w-full border-collapse table-xs">
            {/* head */}
            <thead>
              <tr className="bg-stone-200 text-black/70">
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border">Requested Date</th>
                <th className="px-4 py-2 border">Requested Status</th>
                <th className="px-4 py-2 border">Requested By</th>
                <th className="px-4 py-2 border">Material</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Financial Approval</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((user, index) => (
                  <tr key={index} className="bg-base-100">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{formatDate(user.requestDate)}</td>
                    <td className="px-4 py-2 border">{user.requestStatus}</td>
                    <td className="px-4 py-2 border">{user.requestedBy}</td>
                    <td className="px-4 py-2 border">{user.material}</td>
                    <td className="px-4 py-2 border">{user.priority}</td>
                    <td className="px-4 py-2 border">{user.financeApproval}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center border">
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

export default SupplierList;

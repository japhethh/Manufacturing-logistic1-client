import axios from "axios";
import { useEffect, useState } from "react";

const Orderhistory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/user/getAllUsers"
        );
        setUsers(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError("Error fetching users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="w-full mb-2 flex justify-end">
        <button className="py-2 px-3 rounded-full border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white duration-150">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="table table-xs w-full border-collapse">
            {/* head */}
            <thead>
              <tr className="bg-stone-200 text-black/70">
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2">Request By</th>
                <th className="border px-4 py-2">Material</th>
                <th className="border px-4 py-2">Request Data</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Request Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="bg-base-100">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.requestedBy}</td>
                    <td className="border px-4 py-2">{user.material}</td>
                    <td className="border px-4 py-2">{user.requestedData}</td>
                    <td className="border px-4 py-2">{user.priority}</td>
                    <td className="border px-4 py-2">{user.requestedStatus}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border px-4 py-2">
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

export default Orderhistory;

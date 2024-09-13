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
                <th className="px-4 py-2 border">Request By</th>
                <th className="px-4 py-2 border">Material</th>
                <th className="px-4 py-2 border">Request Data</th>
                <th className="px-4 py-2 border">Priority</th>
                <th className="px-4 py-2 border">Request Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="bg-base-100">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">{user.requestedBy}</td>
                    <td className="px-4 py-2 border">{user.material}</td>
                    <td className="px-4 py-2 border">{user.requestedData}</td>
                    <td className="px-4 py-2 border">{user.priority}</td>
                    <td className="px-4 py-2 border">{user.requestedStatus}</td>
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

export default RawMaterialRequest;

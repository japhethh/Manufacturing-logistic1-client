import axios from "axios";
import { useEffect, useState } from "react";

const Orderhistory = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/getAllUsers");
        setUsers(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        setError('Error fetching users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="table-auto w-full border-collapse">
            {/* head */}
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2"></th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Password</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={index} className="bg-base-200">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.password}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center border px-4 py-2">No users found</td>
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

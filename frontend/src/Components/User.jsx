import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Store from "../context/Store";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";

const User = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null); // For Details Modal
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null); // For Delete Confirmation Modal
  const [searchQuery, setSearchQuery] = useState(""); // For search input

  const { apiURL } = useContext(UserContext);

  const { fetchAllUsers, allUsers, searchUsers } = Store();

  useEffect(() => {
    fetchAllUsers();
    
  }, [fetchAllUsers]);

  useEffect(() => {
    console.log(allUsers)
    if (searchQuery) {
      searchUsers(searchQuery);
    } else {
      // If searchQuery is empty, show all users
      fetchAllUsers();
    }
  }, [searchQuery, fetchAllUsers, searchUsers]);

  const handleCreate = () => {
    navigate("/user/createuser");
  };

  const handleDetails = (user) => {
    setSelectedUser(user); // Set the selected user for Details Modal
    document.getElementById("details_modal").showModal();
  };

  const openDeleteModal = (user) => {
    setSelectedUserToDelete(user); // Set the selected user for Delete Modal
    document.getElementById("delete_modal").showModal();
  };

  const confirmDelete = async () => {
    if (!selectedUserToDelete) return;

    try {
      const response = await axios.post(
        `${apiURL}/api/user/delete/${selectedUserToDelete._id}`
      );

      if (response.data.success) {
        toast.success("Deleted Successfully");
        fetchAllUsers();
        setSelectedUserToDelete(null);
        document.getElementById("delete_modal").close();
      } else {
        toast.error(response.data.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const handleDelete = (user) => {
    openDeleteModal(user);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <NavLink to="/">
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <span>User</span>
          </li>
        </ul>
      </div>

      <div className="p-2 shadow-md">
        <div className="border-b-2 my-2">
          <div>
            <button
              onClick={handleCreate}
              className="px-4 py-3 font-semibold text-sm rounded-full bg-blue-700 text-white mb-2"
            >
              Add Employee +
            </button>
          </div>
        </div>
        <div className="flex justify-end mb-4">
          <label className="input input-bordered flex items-center gap-2 w-1/5">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allUsers?.map((user, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user?.email}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span>
                  </td>
                  <td>{user?.phone}</td>
                  <td>{user?.userName}</td>
                  <td>
                    <button
                      className={`btn btn-ghost btn-xs ${
                        user?.role === "admin"
                          ? "bg-green-500 text-white"
                          : user?.role === "employee"
                          ? "bg-blue-500 text-white"
                          : user?.role === "pending"
                          ? "bg-red-500 text-white"
                          : ""
                      }`}
                    >
                      {user?.role}
                    </button>
                  </td>
                  <td>
                    <div className="dropdown dropdown-left">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                      >
                        <HiDotsHorizontal />
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w- p-2 shadow"
                      >
                        <li>
                          <a
                            className="justify-between font-medium"
                            onClick={() => handleDetails(user)}
                          >
                            Details
                          </a>
                        </li>
                        <li>
                          <Link
                            to={`/user/edit/${user._id}`}
                            className="text-blue-500 font-medium"
                          >
                            Edit
                          </Link>
                        </li>
                        <li>
                          <a
                            className="text-red-500 font-medium"
                            onClick={() => handleDelete(user)}
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* Foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Username</th>
                <th>Role</th>
                <th>Action</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Details Modal */}
        <dialog id="details_modal" className="modal">
          {selectedUser && (
            <div className="modal-box">
              <h3 className="font-bold text-lg pb-3">Details</h3>
              <ul className="flex flex-col gap-2">
                <li className="font-semibold">
                  Name: <span className="text-black font-semibold">{selectedUser.name}</span>
                </li>
                {selectedUser?.email && (
                  <li className="font-semibold">
                    Email: <span className="text-black font-semibold">{selectedUser.email}</span>
                  </li>
                )}
                {selectedUser?.phone && (
                  <li className="font-semibold">
                    Phone: <span className="text-black font-semibold">{selectedUser.phone}</span>
                  </li>
                )}
                {selectedUser?.address && (
                  <li className="font-semibold">
                    Address: <span className="text-black font-semibold">{selectedUser.address}</span>
                  </li>
                )}
              </ul>
              <div className="modal-action">
                <button className="btn btn-sm" onClick={() => document.getElementById("details_modal").close()}>
                  Close
                </button>
              </div>
            </div>
          )}
        </dialog>

        {/* Delete Confirmation Modal */}
        <dialog id="delete_modal" className="modal">
          {selectedUserToDelete && (
            <div className="modal-box">
              <h3 className="font-bold text-lg pb-3">Are you sure you want to delete this user?</h3>
              <p>
                <strong>Name:</strong> {selectedUserToDelete.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUserToDelete.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUserToDelete.phone}
              </p>
              <div className="modal-action">
                <button className="btn btn-error" onClick={confirmDelete}>
                  Delete
                </button>
                <button className="btn btn-sm" onClick={() => document.getElementById("delete_modal").close()}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </dialog>
      </div>
    </div>
  );
};

export default User;

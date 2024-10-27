import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Store from "../context/Store";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
import Pagination from "./Pagination";

const User = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null); // For Details Modal
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null); // For Delete Confirmation Modal
  const [searchQuery, setSearchQuery] = useState(""); // For search input

  const { apiURL } = useContext(UserContext);

  const { fetchAllUsers, allUsers, searchUsers } = Store();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // You can change this to adjust how many users per page

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    if (searchQuery) {
      searchUsers(searchQuery);
    } else {
      fetchAllUsers();
    }
  }, [searchQuery, fetchAllUsers, searchUsers]);

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalUsers = allUsers.length;

  // Change page

  const handleCreate = () => {
    navigate("/user/createuser");
  };

  const handleDetails = (user) => {
    setSelectedUser(user);
    document.getElementById("details_modal").showModal();
  };

  const openDeleteModal = (user) => {
    setSelectedUserToDelete(user);
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

  // Pagination JSX
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allUsers.length / usersPerPage); i++) {
    pageNumbers.push(i);
  }

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
              className="px-4 py-3 font-semibold text-sm rounded-md bg-blue-700 text-white mb-2"
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
              {currentUsers.map((user, index) => (
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
                          : user?.role === "user"
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
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <Pagination
            totalItems={totalUsers}
            itemsPerPage={usersPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Details Modal */}
        <dialog id="details_modal" className="modal">
          {selectedUser && (
            <div className="modal-box">
              <h3 className="font-bold text-lg pb-3">Details</h3>
              <ul className="flex flex-col gap-2">
                <li className="font-semibold">
                  Name:{" "}
                  <span className="text-black font-semibold">
                    {selectedUser.name}
                  </span>
                </li>
                <li className="font-semibold">
                  Email:{" "}
                  <span className="text-black">{selectedUser.email}</span>
                </li>
                <li className="font-semibold">
                  Phone:{" "}
                  <span className="text-black">{selectedUser.phone}</span>
                </li>
                <li className="font-semibold">
                  Username:{" "}
                  <span className="text-black">{selectedUser.userName}</span>
                </li>
              </ul>
              <div className="modal-action">
                <button
                  onClick={() =>
                    document.getElementById("details_modal").close()
                  }
                  className="btn btn-sm btn-circle btn-outline"
                >
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
              <h3 className="font-bold text-lg">
                Are you sure you want to delete this user?
              </h3>
              <p className="py-4">
                This action cannot be undone, and all data related to this user
                will be removed.
              </p>
              <div className="modal-action">
                <button
                  onClick={confirmDelete}
                  className="btn btn-danger btn-sm"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() =>
                    document.getElementById("delete_modal").close()
                  }
                  className="btn btn-sm btn-circle btn-outline"
                >
                  Close
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

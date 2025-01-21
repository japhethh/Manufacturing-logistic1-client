import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Store from "../context/Store";
import { HiDotsHorizontal } from "react-icons/hi";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { toast } from "react-toastify";
// import Pagination from "./Pagination";
import DataTable from "datatables.net-dt";
import defaultProfile from "./Assets/defaultProfile.png";
const User = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null); // For Details Modal
  const [selectedUserToDelete, setSelectedUserToDelete] = useState(null); // For Delete Confirmation Modal

  const { apiURL } = useContext(UserContext);

  const { fetchAllUsers, allUsers } = Store();

  // Pagination state

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: allUsers,
      columns: [
        {
          title: "Image",
          data: null,
          render: (data) => {
            const imageUrl = data?.image ? data?.image : defaultProfile;
            return `<img
                      src="${imageUrl}"
                      alt="Profile"
                      class="rounded-full"
                      style="width: 50px; height: 50px; object-fit: cover;"
                    />`;
          },
        },
        {
          title: "Name",
          data: null,
          render: (data) => data?.name || "N/A",
        },
        {
          title: "Email",
          data: null,
          render: (data) => data?.email || "N/A",
        },
        {
          title: "Phone",
          data: null,
          render: (data) => data?.phone || "N/A",
        },
        {
          title: "Username",
          data: null,
          render: (data) => data?.userName || "N/A",
        },
        {
          title: "Role",
          data: null,
          render: (data) => {
            const roleClass =
              data?.role === "admin"
                ? "bg-green-500 text-white"
                : data?.role === "user"
                ? "bg-blue-500 text-white"
                : data?.role === "pending"
                ? "bg-red-500 text-white"
                : data?.role === "superAdmin"
                ? "bg-violet-500 text-white"
                : "bg-gray-500 text-white";

            return `<button class="btn btn-ghost btn-xs ${roleClass}">
                      ${data?.role || "N/A"}
                    </button>`;
          },
        },
        {
          title: "Decision",
          data: null,
          render: (data) => `
            <div class="dropdown dropdown-left">
              <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle avatar"
                id="dropdownBtn_${data._id}"
              >
                <i class="fas fa-ellipsis-h"></i>
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
              >
                <li>
                  <a
                    id="detailsBtn_${data._id}"
                    class="justify-between font-medium"
                  >
                    Details
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="text-blue-500 font-medium"
                    id="editBtn_${data._id}"
                  >
                    Edit
                  </a>
                </li>
                <li>
                  <button
                    id="deleteBtn_${data._id}"
                    class="text-red-500 font-medium"
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          `,
        },
      ],

      rowCallback: (row, data) => {
        const detailsBtn = row.querySelector(`#detailsBtn_${data?._id}`);
        const editBtn = row.querySelector(`#editBtn_${data?._id}`);

        const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);

        detailsBtn.addEventListener("click", () => handleDetails(data));

        editBtn.addEventListener("click", () =>
          navigate(`/user/edit/${data._id}`)
        );

        deleteBtn.addEventListener("click", () => {
          openDeleteModal(data);
        });
      },
    });

    // Cleanup function to destroy the DataTable instance on unmount
    return () => {
      table.destroy();
    };
  }, [allUsers]);

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

  // const handleDelete = (user) => {
  //   openDeleteModal(user);
  // };

  return (
    <div className="container mx-auto px-4">
      <div className="breadcrumbs text-sm mb-5">
        <ul>
          <li>
            <NavLink to="/" className="text-blue-600">
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <span>View All Accounts</span>
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
              Add Account +
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full" id="myTable">
            <thead className="text-white bg-blue-800"></thead>
            {/* <tbody>
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
            </tbody> */}
          </table>
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
                  className="btn btn-primary btn-sm"
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
                  className="btn btn-error text-white btn-sm"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() =>
                    document.getElementById("delete_modal").close()
                  }
                  className="btn btn-sm "
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

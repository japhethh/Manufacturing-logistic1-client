import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../context/Store";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import store from "../context/Store";
import DataTable from "datatables.net-dt";
const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const { token } = store();

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: requests, // Use the requests array as data source
      columns: [
        {
          title: "SupplierName",
          data: "supplierName",
        },
        {
          title: "Email",
          data: "email",
        },
        {
          title: "Contact Phone",
          data: "contactPhone",
        },
        {
          title: "Status",
          data: null,
          render: (data) => {
            if (data?.status) {
              const badgeClass =
                data.status === "Active"
                  ? "badge-success"
                  : data.status === "Deactivated"
                  ? "badge-error"
                  : "badge-warning";
              return `<span class="badge ${badgeClass}">${data.status}</span>`;
            }
            return "N/A";
          },
        },
        {
          title: "Action",
          data: null,
          render: (data) =>
            `
            <button class="btn btn-success btn-sm text-white" id="activateBtn_${data._id}">
              Activate
            </button>
            <button class="btn btn-error btn-sm text-white" id="deactivateBtn_${data._id}">
              Deactivate
            </button>
            `,
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
      order: [[0, "desc"]],
      rowCallback: (row, data) => {
        // Add event listeners to dropdown buttons
        const detailsBtn = row.querySelector(`#detailsBtn_${data._id}`);
        const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);
        const activateBtn = row.querySelector(`#activateBtn_${data._id}`);
        const deactivateBtn = row.querySelector(`#deactivateBtn_${data._id}`);

        if (detailsBtn) {
          detailsBtn.addEventListener("click", () => openModal(data));
        }

        if (deleteBtn) {
          deleteBtn.addEventListener("click", () => deleteModal(data));
        }

        if (activateBtn) {
          activateBtn.addEventListener("click", () => approveModal(data));
        }

        if (deactivateBtn) {
          deactivateBtn.addEventListener("click", () => deactivatedModal(data));
        }
      },
    });

    // Cleanup function to destroy the DataTable instance when the component unmounts
    return () => {
      table.destroy();
    };
  }, [requests]);

  const fetchAllData = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setRequests(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch requests. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (data) => {
    setSelectedRequestId(data);
    console.log(data);
    document.getElementById("my_modal_3").showModal();
  };

  const closeModal = () => {
    setSelectedRequestId(null);
    document.getElementById("my_modal_3").close();
  };

  const approveModal = (data) => {
    setSelectedRequestId(data);
    console.log(data);
    document.getElementById("my_modal_4").showModal();
  };

  const handleApprove = async (supplierId) => {
    try {
      const response = await axios.put(
        `${apiURL}/api/supplier/approveSupplier/${supplierId}`
      );

      toast.success(response.data.message);
      fetchAllData();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const deactivatedModal = (supplierId) => {
    setSelectedRequestId(supplierId);
    console.log(supplierId);
    document.getElementById("my_modal_5").showModal();
  };

  const handleDeactivated = async (supplierId) => {
    try {
      const response = await axios.put(
        `${apiURL}/api/supplier/deactivatedSupplier/${supplierId}`
      );

      toast.info(response.data.message);
      fetchAllData();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-center",
      });
    }
  };

  const deleteModal = (supplierId) => {
    setSelectedRequestId(supplierId);
    console.log(supplierId);
    document.getElementById("my_modal_6").showModal();
  };

  const handleDelete = async (supplierId) => {
    try {
      const response = await axios.delete(
        `${apiURL}/api/supplier/delete/${supplierId}`
      );

      toast.error(response.data.message);
      fetchAllData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateRequestStatus = (id, status) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
    closeModal();
  };

  const handleApproval = (id) => {
    // updateRequestStatus(id, "Accepted");
  };

  const handleRejection = (id) => {
    // updateRequestStatus(id, "Rejected");
  };

  if (loading) return <p>Loading requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto ">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <Link to="/">
              <a className="underline text-blue-500"> Dashboard</a>
            </Link>
          </li>
          <li>
            <Link>Account Request</Link>
          </li>
        </ul>
      </div>

      <div className="p-5 ">
        <div>
          <h1 className="font-bold text-2xl ">Account Request</h1>
        </div>
        <div className="p-5">
          <table id="myTable">
            <thead className="text-white bg-blue-800"></thead>
          </table>
          {/* <table className="table w-full">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Phone</th>
              <th>Status</th>
              <th>Decision</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={
                            request.logo ||
                            "https://img.daisyui.com/images/profile/demo/2@94.webp"
                          }
                          alt="Avatar"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{request.firstName}</div>
                </td>
                <td>
                  <div className="text-sm">{request.email}</div>
                </td>
                <td>{request.contactPhone || "N/A"}</td>
                <td>
                  <span
                    className={`badge ${
                      request.status === "Active"
                        ? "badge-success"
                        : request.status === "Deactivated"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>

                <td>
                  <div className="flex justify-start items-center gap-3 ">
                    <button
                      onClick={() => approveModal(request)}
                      className="btn btn-success btn-sm text-white"
                    >
                      Activate
                    </button>
                    <button
                      className="btn btn-error btn-sm text-white"
                      onClick={() => deactivatedModal(request)}
                    >
                      Deactivated
                    </button>
                  </div>
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
                          onClick={() => openModal(request)}
                          className="justify-between font-medium"
                        >
                          Details
                        </a>
                      </li>
                      <li>
                        <Link to="" className="text-blue-500 font-medium">
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => deleteModal(request)}
                          className="text-red-500 font-medium"
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Logo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Phone</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table> */}
        </div>
      </div>

      {/* Modal Approve */}
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Modal title */}
          <h3 className="font-bold text-lg">Approve Request</h3>

          {/* Descriptive label */}
          <p className="py-4">
            Are you sure you want to approve this request
            <span className="font-bold ">
              {" "}
              {`${selectedRequestId?.supplierName}`}
            </span>
          </p>

          {/* Action buttons */}
          <div className="flex justify-end gap-5">
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_4"
                className="btn-success btn btn-md text-white"
                onClick={() => handleApprove(selectedRequestId?._id)}
              >
                Confirm Approve
              </button>
            </form>
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_4"
                className="btn btn-outline btn-error btn-md text-white"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal Deactivated */}
      <dialog id="my_modal_5" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* Close button */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Modal title */}
          <h3 className="font-bold text-lg">Deativated Request</h3>

          {/* Descriptive label */}
          <p className="py-4">
            Are you sure you want to approve this request
            <span className="font-bold ">
              {" "}
              {`${selectedRequestId?.supplierName}`}
            </span>
          </p>

          {/* Action buttons */}
          <div className="flex justify-end gap-5">
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_5"
                className="btn-error btn btn-md text-white"
                onClick={() => handleDeactivated(selectedRequestId?._id)}
              >
                Confirm Deactivated
              </button>
            </form>
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_5"
                className="btn-outline btn btn-error btn-md text-white"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal for Delete Confirmation */}
      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          {/* Close button */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {/* Modal title */}
          <h3 className="font-bold text-lg">Delete Supplier Request</h3>

          {/* Descriptive label */}
          <p className="py-4">
            Are you sure you want to{" "}
            <span className="text-red-500 font-bold">delete</span> the request
            from
            <span className="font-bold">
              {" "}
              {selectedRequestId?.supplierName}
            </span>
            ? This action cannot be undone and will permanently remove the
            request from the system.
          </p>

          {/* Action buttons */}
          <div className="flex justify-end gap-5">
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_6"
                className="btn btn-error btn-md text-white"
                onClick={() => handleDelete(selectedRequestId?._id)}
              >
                Confirm Delete
              </button>
            </form>
            <form method="dialog" className="modal-action">
              <button
                htmlFor="my_modal_6"
                className="btn-outline btn btn-error btn-md text-white"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal ">
        <div className="modal-box w-11/12 max-w-5xl">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Details</h3>
          <div className="py-4 grid grid-cols-2">
            <div className="font-semibold">
              <div className="border border-1 py-2 px-2">
                <h1>SUPPLIER CODE</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Company</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Customer Name</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Contact Person</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Contact Email</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Contact Phone</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Gender</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>City</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Country</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Address</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Payment Terms</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Website</h1>
              </div>
            </div>

            <div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.supplierCode
                    ? selectedRequestId?.supplierCode
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {" "}
                  {selectedRequestId?.supplierName
                    ? selectedRequestId?.supplierName
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.firstName || selectedRequestId?.lastName
                    ? `${selectedRequestId?.firstName ?? ""} ${
                        selectedRequestId?.lastName ?? ""
                      }`.trim()
                    : "N/A"}
                </h1>{" "}
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.contactPerson
                    ? selectedRequestId?.contactPerson
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2 ">
                <h1>
                  {selectedRequestId?.contactEmail
                    ? selectedRequestId?.contactEmail
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.contactPhone
                    ? selectedRequestId?.contactPhone
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.gender
                    ? selectedRequestId?.gender
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.address?.city
                    ? selectedRequestId?.address?.city
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.address?.country
                    ? selectedRequestId?.address?.country
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Purok Mayaman</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.paymentTerms
                    ? selectedRequestId?.paymentTerms
                    : "N/A"}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  <a
                    href={`${
                      selectedRequestId?.website
                        ? selectedRequestId?.website
                        : ""
                    }`}
                    className="underline text-blue-500"
                  >
                    {selectedRequestId?.website
                      ? selectedRequestId?.website
                      : "N/A"}
                  </a>
                </h1>
              </div>
            </div>
          </div>
          <h3 className="font-bold text-lg">Items</h3>

          <div className="overflow-x-auto border border-1">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <td>ID</td>
                  <th>Material Code</th>
                  <th>Items</th>
                  <th>Unit Price</th>
                  <th>Descriptions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {selectedRequestId?.materialSupplied.map((item) => (
                  <tr key={item._id}>
                    <td>{item?._id}</td>
                    <th>{item?.materialCode ? item?.materialCode : "N/A"}</th>
                    <td>{item?.materialName ? item?.materialName : "N/A"} </td>
                    <td className="text-green-600 font-bold text-md">
                      {item?.pricePerUnit ? item?.pricePerUnit : "N/A"}
                    </td>
                    <td>{item?.description ? item?.description : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestList;

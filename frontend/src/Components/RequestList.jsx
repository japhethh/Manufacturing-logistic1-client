import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { apiURL } from "../context/Store";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

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
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Phone</th>
            <th>Status</th>
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
                      : request.status === "Inactive"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {request.status}
                </span>
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
                      <a className="text-red-500 font-medium">Delete</a>
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
      </table>

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
                <h1>{selectedRequestId?.supplierCode}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>STELLA COMPANY {selectedRequestId?.supplierName}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>
                  {selectedRequestId?.firstName} {selectedRequestId?.lastName}
                </h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.contactPerson}</h1>
              </div>
              <div className="border border-1 py-2 px-2 ">
                <h1>{selectedRequestId?.contactEmail}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.contactPhone}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.gender}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.address?.city}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.address?.country}</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>Purok Mayaman</h1>
              </div>
              <div className="border border-1 py-2 px-2">
                <h1>{selectedRequestId?.paymentTerms}</h1>
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
                    selectedRequestId?.website
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
                    <th>{item?.materialCode}</th>
                    <td>{item?.materialName}</td>
                    <td className="text-green-600 font-bold text-md">{item?.pricePerUnit}</td>
                    <td>{item?.description}</td>
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

import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const requestsData = [
  { id: 1, name: "John Doe", status: "Pending" },
  { id: 2, name: "Jane Smith", status: "Accepted" },
  { id: 3, name: "Alice Johnson", status: "Rejected" },
];

const RequestList = () => {
  const [requests, setRequests] = useState(requestsData);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRequests, setSelectedRequests] = useState(new Set());
  const [selectedRequestId, setSelectedRequestId] = useState(null); // To track the selected request for the modal

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRequests(new Set());
    } else {
      const allIds = requests.map((request) => request.id);
      setSelectedRequests(new Set(allIds));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRequest = (id) => {
    const updatedSelected = new Set(selectedRequests);
    if (updatedSelected.has(id)) {
      updatedSelected.delete(id);
    } else {
      updatedSelected.add(id);
    }
    setSelectedRequests(updatedSelected);
  };

  const openModal = (id) => {
    setSelectedRequestId(id); // Set the selected request ID
    document.getElementById("my_modal_3").showModal(); // Open the modal
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </label>
            </th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="hover:bg-gray-100">
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={selectedRequests.has(request.id)}
                    onChange={() => handleSelectRequest(request.id)}
                  />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="https://img.daisyui.com/images/profile/demo/2@94.webp" // Placeholder image; replace as needed
                        alt="Avatar"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{request.name}</div>
                    <div className="text-sm opacity-50">{request.status}</div>
                  </div>
                </div>
              </td>
              <td>
                <span
                  className={`badge ${
                    request.status === "Accepted"
                      ? "badge-success"
                      : request.status === "Rejected"
                      ? "badge-error"
                      : "badge-warning"
                  }`}
                >
                  {request.status}
                </span>
              </td>
              <td>
                {request.status === "Pending" && (
                  <div className="flex gap-2">
                    <button className="btn btn-success btn-xs">Approve</button>
                    <button className="btn btn-error btn-xs">Reject</button>
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => openModal(request.id)}
                    >
                      View
                    </button>
                  </div>
                )}
                {request.status === "Accepted" && (
                  <span className="text-green-600 font-bold">Approved</span>
                )}
                {request.status === "Rejected" && (
                  <span className="text-red-600 font-bold">Rejected</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </tfoot>
      </table>

      {/* Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              <IoClose />
            </button>
          </form>
          <h3 className="font-bold text-lg">Request Details</h3>
          <p className="py-4">
            You can perform actions on request ID: {selectedRequestId}
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default RequestList;

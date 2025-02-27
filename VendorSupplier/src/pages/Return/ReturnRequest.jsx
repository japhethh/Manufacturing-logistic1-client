import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../../context/verifyStore";
import Store from "../../context/verifyStore";
const ReturnRequest = () => {
  const [returnRequestData, setReturnRequestData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [selectImage, setSelectImage] = useState(null);
  const [modalType, setModalType] = useState("");
  const [showImageModal, setShowImageModal] = useState(false); // New state for image modal

  const { token } = Store();

  useEffect(() => {
    fetchReturnRequest();
  }, []);

  const fetchReturnRequest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/vendor_return`, {
        headers: { token: token },
      });
      setLoading(false);
      console.log(response?.data);
      setReturnRequestData(response?.data);
    } catch (error) {
      console.log(error?.response?.data.message);
    }
  };

  const handleImage = (image) => {
    setSelectImage(image);
    setShowImageModal(true); // Show the image modal
  };

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: returnRequestData,
      columns: [
        {
          title: "Return Number #",
          data: "returnRequestNumber",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Return Request ID",
          data: "_id",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Reason",
          data: "reason",
          render: (data) => `${data ? data : "N/A"}`,
        },
        {
          title: "Request Status",
          data: null,
          render: (data) => {
            const status = data?.status;
            const statusClasses = {
              Approved: "bg-blue-200 text-blue-800",
              Rejected: "bg-red-200 text-red-800",
              Pending: "bg-gray-200 text-gray-800",
            };

            return `
              <div class="flex justify-center">
                <button class="py-1 px-2 rounded-full ${
                  statusClasses[status] || "bg-gray-200 text-black"
                }">
                  ${status || "N/A"}
                </button>
              </div>
            `;
          },
        },
        {
          title: "Action",
          data: null,
          render: (
            data,
            type,
            row
          ) => ` <div class="flex justify-center gap-2"> 
            <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="detailBtn_${row._id}">
              <i class="fas fa-eye"></i>
            </button>
          </div>`,
        },
      ],
      order: [[0, "asc"]],
      rowCallback: (row, data) => {
        const detailBtn = row.querySelector(`#detailBtn_${data?._id}`);

        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("detail");
            setShowModal(true);
            setFetchAdjustment(data);
          });
        }
      },
    });

    return () => {
      table.destroy();
    };
  }, [returnRequestData]);

  return (
    <div className="p-3">
      <h1 className="font-semibold text-4xl text-gray-800">Return Request</h1>
      <table id="myTable"></table>

      {showModal &&
        modalType === "detail" &&
        selectedData &&
        fetchAdjustment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-hidden">
              {/* Image Grid */}
              <div className="grid grid-cols-2 gap-3 overflow-auto max-h-60 mb-4 p-2">
                {selectedData?.attachments.map((item, index) => (
                  <div key={index} className="flex justify-center">
                    <img
                      className="w-24 h-24 object-cover rounded-md cursor-pointer hover:opacity-75 transition"
                      onClick={() => handleImage(item)}
                      src={item}
                      alt="Defect Image"
                    />
                  </div>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-2xl font-semibold py-2 font-Roboto text-gray-800">
                Details
              </h1>

              {/* Details Section */}
              <div className="space-y-3">
                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                    Reference
                  </div>
                  <div className="w-1/2 p-2">
                    {selectedData?.returnRequestNumber}
                  </div>
                </div>

                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                    Defect Description
                  </div>
                  <div className="w-1/2 p-2">{selectedData?.reason}</div>
                </div>

                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                    Severity
                  </div>
                  <div className="w-1/2 p-2">{selectedData?.severity}</div>
                </div>
              </div>

              <div className="flex gap-3 justify-center mt-4">
                <button className="btn btn-primary text-white ">Approve</button>
                <button className="btn btn-error text-white ">Reject</button>
              </div>
              {/* Button Section */}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-Roboto hover:opacity-80 transition"
                  onClick={() => {
                    setSelectedData(null);
                    setShowModal(false);
                    setFetchAdjustment(null);
                    setSelectImage(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      {showImageModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
          <img
            className="max-w-full max-h-full"
            src={selectImage}
            alt="Full View"
            onClick={() => setShowImageModal(false)} // Close the modal when clicking on the image
          />
        </div>
      )}
    </div>
  );
};

export default ReturnRequest;

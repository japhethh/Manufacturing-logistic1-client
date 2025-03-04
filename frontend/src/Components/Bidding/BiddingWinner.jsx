import DataTable from "datatables.net-dt";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../context/Store";

const BiddingWinner = () => {
  const [biddingWinner, setBiddingWinner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [selectImage, setSelectImage] = useState(null);
  const [modalType, setModalType] = useState("");
  // const [showImageModal, setShowImageModal] = useState(false);

  const exampleData = [
    {
      name: "Test1",
      age: 20,
      _id: 1,
    },
    {
      name: "Test2",
      age: 20,
      _id: 2,
    },
    {
      name: "Test3",
      age: 20,
      _id: 3,
    },
    {
      name: "Test4",
      age: 20,
      _id: 4,
    },
  ];

  useEffect(() => {}, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: exampleData,
      columns: [
        {
          title: "Name",
          data: "name",
        },
        {
          title: "Age",
          data: "age",
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
  }, [exampleData]);

  return (
    <div className="p-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <a>Winner List</a>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-semibold text-4xl text-gray-800">Winner List</h1>
      </div>
      <div>
        <table id="myTable" className="display"></table>
      </div>

      {showModal &&
        modalType === "detail" &&
        selectedData &&
        fetchAdjustment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-hidden">
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
                    {selectedData?.returnRequestNumber
                      ? selectedData?.returnRequestNumber
                      : "N/A"}
                  </div>
                </div>

                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                    Defect Description
                  </div>
                  <div className="w-1/2 p-2">
                    {selectedData?.reason ? selectedData?.reason : "N/A"}
                  </div>
                </div>

                <div className="flex border rounded-lg overflow-hidden">
                  <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                    Severity
                  </div>
                  <div className="w-1/2 p-2">
                    {selectedData?.severity ? selectedData?.severity : "N/A"}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center mt-4">
                <button
                  className="btn btn-primary text-white"
                  onClick={() => {
                    // updateStatus("Re_Order");
                    setSelectedData(null);
                    setShowModal(false);
                    setFetchAdjustment(null);
                    setSelectImage(null);
                  }}
                >
                  Re-Order
                </button>
                <button
                  className="btn btn-error text-white"
                  onClick={() => {
                    // updateStatus("Refund");
                    setSelectedData(null);
                    setShowModal(false);
                    setFetchAdjustment(null);
                    setSelectImage(null);
                  }}
                >
                  Refund
                </button>
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
    </div>
  );
};

export default BiddingWinner;

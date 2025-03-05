import { useEffect, useState } from "react";
import BiddingItems from "./BiddingItems";
import axios from "axios";
import Store from "../../context/Store";
import DataTable from "datatables.net-dt";

import { apiURL } from "../../context/Store";
import { toast } from "react-toastify";
const BiddingProduct = () => {
  const [product, setProduct] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { token, fetchUserData, userData } = Store();
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBiddingProduct();
    fetchUserData();
  }, []);

  const fetchBiddingProduct = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/bidding`, {
        headers: { token: token },
      });

      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  const handleUpdate = async ({ biddingId, winnerId }) => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${apiURL}/api/bidding/bidding-selectBiddingWinner`,
        { biddingId: biddingId, winnerId: winnerId },
        { headers: { token: token } }
      );
      toast.success(response.data.message);
      fetchBiddingProduct();
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error?.response.data.message);
    }
  };

  const handleDelete = async ({ id, winnerId }) => {
    console.log(winnerId);
    console.log(id);
    try {
      await axios.post(
        `${apiURL}/api/bidding/delete/${id}`,
        { winnerId },
        {
          headers: { token: token },
        }
      );
      fetchBiddingProduct();
      toast.info("Product deleted successfully!");
      setSelectedData(null); // Reset selectedData
      setShowModal(false); // Close the modal
    } catch (error) {
      toast.error(error?.response?.data?.message || "Delete failed.");
    }
  };

  useEffect(() => {
    let table = new DataTable("#myTable", {
      destroy: true,
      data: product,
      columns: [
        {
          title: "Bidding Code #",
          data: "biddingNumber",
          render: (data) => data || "N/A",
        },
        {
          title: "Img",
          data: "productImage",
          render: (data) => {
            return data
              ? `<img src="${data}" alt="Product Image" class="w-12 h-12 object-cover rounded-lg"/>`
              : "N/A";
          },
        },
        {
          title: "Category",
          data: "category",
          render: (data) => data || "N/A",
        },
        {
          title: "Name",
          data: null,
          render: (data) => {
            return `<div>
              <div class="flex flex-col gap-2">
                <h1>Regular Price: <span class="font-semibold">${
                  data ? data?.regularPrice : "N/A"
                }</span></h1>
                <h1>End Date/Time: <span class="font-semibold">${
                  data
                    ? new Date(data?.biddingEndDate).toLocaleDateString()
                    : "N/A"
                }</span></h1>
                <h1>Highest Bid: <span>15,000</span></h1>
                <h1>Total Bids: <span>1 user/s</span></h1>
              </div>
            </div>`;
          },
        },
        // { title: "Id", data: "_id", render: (data) => data || "N/A" },
        {
          title: `${userData?.role === "superAdmin" ? "Action" : ""}`,
          data: null,
          render: (data, row) => {
            return `
            <div>
           <button class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${data?._id}">
            <i class="fas fa-trash-alt"></i>
              </button>
         <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="detailBtn_${data._id}">
              <i class="fas fa-eye"></i>
            </button>
              </div>
              `;
          },
        },
      ],
      rowCallback: (row, data) => {
        const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);

        deleteBtn.addEventListener("click", () => {
          setSelectedData(data);
          setModalType("delete"); // Set modal for delete
          setShowModal(true); // Show the modal
        });

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
  }, [product]);

  return (
    <div className="p-4">
      <div className="mb-2">
        <BiddingItems />
      </div>
      <h2 className="text-2xl font-semibold mb-4">List Products</h2>
      <div className="overflow-x-auto">
        <table id="myTable" className="display"></table>
      </div>

      {/* Delete Modal */}
      {showModal && modalType === "delete" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h3 className="text-lg font-bold font-Roboto">Bidding</h3>
            <p className="py-4 font-Roboto">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold font-Roboto">delete</span>{" "}
              the category{" "}
              <span className="font-bold font-Roboto">
                {selectedData?.materialName}
              </span>
              ? This action cannot be undone and will permanently remove the
              bidding product from the system.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() =>
                  handleDelete({
                    id: selectedData._id,
                    winnerId: selectedData?.winner,
                  })
                }
                className="btn btn-error btn-md text-white font-Roboto"
              >
                Confirm
              </button>
              <button
                className="btn btn-outline btn-error btn-md text-white font-Roboto"
                onClick={() => {
                  setSelectedData(null); // Reset selectedData on cancel
                  setShowModal(false); // Close modal
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal &&
        modalType === "detail" &&
        selectedData &&
        fetchAdjustment && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg p-8 w-full max-w-4xl shadow-lg overflow-hidden">
              {/* Title */}
              <h1 className="text-3xl font-semibold py-4 font-Roboto text-gray-800 text-center">
                Bid Details
              </h1>

              {/* Details Section */}
              <div className="grid grid-cols-2 gap-6">
                {selectedData.bids.length > 0 ? (
                  selectedData.bids.map((bid, index) => (
                    <div
                      key={index}
                      className="space-y-4 border p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex border rounded-lg overflow-hidden">
                        <div className="w-1/2 bg-gray-100 p-3 font-Roboto font-medium">
                          Supplier Name
                        </div>
                        <div className="w-1/2 p-3">
                          {bid.vendor.supplierName}
                        </div>
                      </div>

                      <div className="flex border rounded-lg overflow-hidden">
                        <div className="w-1/2 bg-gray-100 p-3 font-Roboto font-medium">
                          Bid Amount
                        </div>
                        <div className="w-1/2 p-3">{bid.bidAmount}</div>
                      </div>

                      <div className="flex border rounded-lg overflow-hidden">
                        <div className="w-1/2 bg-gray-100 p-3 font-Roboto font-medium">
                          Delivery Time
                        </div>
                        <div className="w-1/2 p-3">{bid.deliveryTime}</div>
                      </div>

                      <div className="flex border rounded-lg overflow-hidden">
                        <div className="w-1/2 bg-gray-100 p-3 font-Roboto font-medium">
                          Terms
                        </div>
                        <div className="w-1/2 p-3">{bid.terms}</div>
                      </div>
                      <div className="flex border rounded-lg overflow-hidden">
                        <div className="w-1/2 bg-gray-100 p-3 font-Roboto font-medium">
                          Winner
                        </div>
                        <div className="w-1/2 p-3">
                          {selectedData?.winner ? "Winner 🎉" : ""}
                        </div>
                      </div>

                      {/* Approve & Reject Buttons */}
                      <div className="flex gap-4 justify-center mt-6">
                        <button
                          className="btn btn-primary text-white px-4 py-2"
                          onClick={() => {
                            setSelectedData(null);
                            handleUpdate({
                              winnerId: bid?.vendor?._id,
                              biddingId: selectedData?._id,
                            });
                            setShowModal(false);
                            setFetchAdjustment(null);
                          }}
                        >
                          Winner
                        </button>
                        <button
                          className="btn btn-error text-white px-4 py-2"
                          onClick={() => {
                            setSelectedData(null);
                            setShowModal(false);
                            setFetchAdjustment(null);
                          }}
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-6 col-span-2">
                    No bids available
                  </p>
                )}
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-6">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-Roboto hover:opacity-80 transition"
                  onClick={() => {
                    setSelectedData(null);
                    setShowModal(false);
                    setFetchAdjustment(null);
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

export default BiddingProduct;

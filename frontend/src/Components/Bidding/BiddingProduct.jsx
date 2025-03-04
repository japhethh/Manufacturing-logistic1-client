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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiURL}/api/bidding/${id}`, {
        headers: { token: token },
      });
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
          render: (data) => {
            return `
            <div>
            ${
              userData?.role === "superAdmin"
                ? `<button class="bg-red-500 text-xs text-white font-Roboto px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${data?._id}">
            <i class="fas fa-trash-alt"></i>
              </button>`
                : ""
            }
              </div>
              `;
          },
        },
      ],
      rowCallback: (row, data) => {
        if (userData?.role === "superAdmin") {
          const deleteBtn = row.querySelector(`#deleteBtn_${data?._id}`);

          deleteBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("delete"); // Set modal for delete
            setShowModal(true); // Show the modal
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
                onClick={() => handleDelete(selectedData._id)}
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
    </div>
  );
};

export default BiddingProduct;

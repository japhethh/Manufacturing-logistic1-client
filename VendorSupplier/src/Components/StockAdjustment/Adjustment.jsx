import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import verify from "../../context/verifyStore";
import { toast } from "react-toastify";
import { apiURL } from "../../context/verifyStore";
import { useNavigate } from "react-router-dom";

const Adjustment = () => {
  const [adjustments, setAdjustments] = useState([]);
  const [productItems, setProductItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { token } = verify();
  const [selectedData, setSelectedData] = useState(null);
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [modalType, setModalType] = useState("");
  const [editCategory, setEditCategory] = useState({
    category_name: "",
    category_code: "",
  });

  const navigate = useNavigate();

  const fetchAdjustments = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/adjustments`, {
        headers: { token: token },
      });
      setAdjustments(response.data.data);
      setProductItems(response.data.productItem);

      console.log(response.data.data);
      console.log(response.data.productItem);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching data");
    }
  };

  useEffect(() => {
    fetchAdjustments();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: adjustments,
      columns: [
        { title: "Date", data: "date" },
        { title: "Reference", data: "reference" },
        {
          title: "Products",
          data: null,
          render: (data, type, row) => {
            return productItems.filter((item) => item.adjustment_id === row._id)
              .length;
          },
        },
        {
          title: "Actions",
          data: null,
          render: (data, type, row) => `
          <div class="flex justify-center"> 
            <button class="bg-sky-500 hover:bg-sky-600 duration-150 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="bg-blue-700 hover:bg-blue-600 duration-150 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${row._id}"> <i class="fas fa-eye"></i>
            </button>
            <button class="bg-red-500 hover:bg-red-400 duration-150 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="deleteBtn_${row._id}">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          `,
        },
      ],
      order: [[1, "desc"]],
      rowCallback: (row, data) => {
        const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);
        const detailBtn = row.querySelector(`#detailBtn_${data._id}`);
        const updateBtn = row.querySelector(`#updateBtn_${data._id}`);

        deleteBtn.addEventListener("click", () => {
          setSelectedData(data);
          setModalType("delete");
          setShowModal(true);
        });

        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            // setSelectedData(data);
            setModalType("detail");
            setShowModal(true); // Show the modal
            fetchAdjusted_products(data._id);
            setFetchAdjustment(data);
          });
        }

        updateBtn.addEventListener("click", () => {
          navigate(`/adjustments/${data._id}/edit`);
          setSelectedData(data);
          setModalType("edit");
          setShowModal(true);
        });
      },
    });

    return () => {
      table.destroy();
    };
  }, [adjustments, productItems]);

  const fetchAdjusted_products = async (id) => {
    try {
      const response = await axios.get(
        `${apiURL}/api/adjusted_products/getSpecificId/${id}`,
        { headers: { token: token } }
      );

      console.log(response.data.data);
      setSelectedData(response.data.data);
    } catch (error) {
      toast.error(error?.reponse.data.message);
      console.log(error?.response.data.message);
    }
  };

  console.log(selectedData);
  console.log(fetchAdjustment);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${apiURL}/api/adjustments/delete/${id}`,
        {
          headers: { token: token },
        }
      );
      toast.error(response.data.message);
      fetchAdjustments();
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  const handleEditCategory = async () => {
    try {
      const response = await axios.put(
        `${apiURL}/api/category/updateCategory/${selectedData._id}`,
        editCategory,
        { headers: { token: token } }
      );
      fetchAdjustments();
      toast.success(response.data.message);
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">
        Stock Adjustment
      </h1>

      <div className="mb-6 shadow-md bg-white p-6 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <button
            className="bg-blue-600 hover:bg-blue-500 text-white w-40 h-12 rounded-lg transition duration-200"
            onClick={() => {
              setShowModal(true);
              navigate("/adjustments/create");
            }}
          >
            Add Adjustments +
          </button>
        </div>
        <div className="divider"></div>

        <table id="myTable" className="display w-full table-auto mt-4">
          <thead className="bg-blue-800 text-white text-sm">
            {/* Table Headers here */}
          </thead>
        </table>

        {/* Delete Modal */}
        {showModal && modalType === "delete" && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg transition transform scale-105">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to{" "}
                <span className="text-red-600 font-bold">delete</span> the
                adjustment for{" "}
                <span className="font-bold">{selectedData?.reference}</span>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleDelete(selectedData._id)}
                  className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-lg transition"
                >
                  Confirm
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-300 text-white px-6 py-3 rounded-lg transition"
                  onClick={() => {
                    setSelectedData(null);
                    setShowModal(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        {showModal &&
          modalType === "detail" &&
          selectedData &&
          fetchAdjustment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
              <div className="bg-white rounded-2xl p-8 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 shadow-2xl transform transition-all duration-300 scale-100 hover:scale-[1.02]">
                {/* Modal Title */}
                <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                  Adjustment Details
                </h3>

                {/* Adjustment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 border-b pb-6">
                  <div className="flex flex-col space-y-3">
                    <div className="text-gray-700 font-medium">
                      Date:{" "}
                      <span className="font-normal text-gray-600">
                        {fetchAdjustment?.date
                          ? new Date(fetchAdjustment.date).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                          : "N/A"}
                      </span>
                    </div>
                    <div className="text-gray-700 font-medium">
                      Reference:{" "}
                      <span className="font-normal text-gray-600">
                        {fetchAdjustment?.reference || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Table Section */}
                <div className="overflow-x-auto mb-8">
                  <table className="table-auto w-full text-sm text-gray-700 border rounded-lg">
                    <thead className="bg-gray-100 text-gray-800">
                      <tr>
                        <th className="px-5 py-3 text-left">Product Name</th>
                        <th className="px-5 py-3 text-left">Code</th>
                        <th className="px-5 py-3 text-left">Quantity</th>
                        <th className="px-5 py-3 text-left">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedData.map((item) => (
                        <tr
                          key={item?._id}
                          className="border-b hover:bg-gray-50 transition duration-200"
                        >
                          <td className="px-5 py-4">
                            {item?.material_id?.materialName}
                          </td>
                          <td className="px-5 py-4">
                            {item?.material_id?.materialCode}
                          </td>
                          <td className="px-5 py-4">{item?.quantity}</td>
                          <td
                            className={`px-5 py-4 font-semibold ${
                              item?.type === "add"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item?.type === "add" ? "(+)" : "(-)"} {item?.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition duration-200"
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

        {/* Edit Modal */}
        {showModal && modalType === "edit" && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/3 shadow-lg transition transform scale-105">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Edit Category
              </h2>
              <input
                type="text"
                value={editCategory.category_name}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    category_name: e.target.value,
                  })
                }
                placeholder="Category Name"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4"
              />
              <input
                type="text"
                value={editCategory.category_code}
                onChange={(e) =>
                  setEditCategory({
                    ...editCategory,
                    category_code: e.target.value,
                  })
                }
                placeholder="Category Code"
                className="border border-gray-300 rounded-lg p-3 w-full mb-4"
              />
              <div className="flex justify-end gap-4">
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition"
                  onClick={handleEditCategory}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-300 text-white px-6 py-3 rounded-lg transition"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedData(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Adjustment;

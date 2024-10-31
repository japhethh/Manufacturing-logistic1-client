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
            <button class="bg-blue-500 hover:bg-blue-400 duration-150 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="updateBtn_${row._id}">
              <i class="fas fa-edit"></i>
            </button>
            <button class="bg-green-700 hover:bg-green-600 duration-150 text-xs text-white px-2 py-1 rounded-lg mx-1 cursor-pointer" id="detailBtn_${row._id}"> <i class="fas fa-eye"></i>
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
    <div className="bg-gray-200 h-auto w-full p-5">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Documents</a>
          </li>
          <li>Add Document</li>
        </ul>
      </div>

      <div className="mb-4 shadow-md bg-white p-4">
        <div className="flex justify-between items-center">
          <button
            className="bg-blue-600 hover:bg-blue-500 duration-200 text-white w-40 h-10 rounded-lg"
            onClick={() => {
              setShowModal(true);
              navigate("/adjustments/create");
            }}
          >
            Add Adjustments +
          </button>
        </div>
        <div className="divider"></div>
        <table id="myTable" className="display w-full"></table>

        {/* Delete Modal */}
        {showModal && modalType === "delete" && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3">
              <h3 className="text-lg font-bold">Adjustment</h3>
              <p className="py-4">
                Are you sure you want to{" "}
                <span className="text-red-600 font-bold">delete</span> the
                category{" "}
                <span className="font-bold">{selectedData?.reference}</span>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => handleDelete(selectedData._id)}
                  className="btn btn-error btn-md text-white"
                >
                  Confirm
                </button>
                <button
                  className="btn btn-outline btn-error btn-md text-white"
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

        {/* Detail */}
        {showModal &&
          modalType === "detail" &&
          selectedData &&
          fetchAdjustment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-5 w-4/6">
                <div className="py-4 grid grid-cols-2">
                  <div className="font-semibold">
                    <div className="border border-1 py-2 px-2">
                      <h1>Date</h1>
                    </div>
                    <div className="border border-1 py-2 px-2">
                      <h1>Reference</h1>
                    </div>
                  </div>

                  <div>
                    <div className="border border-1 py-2 px-2">
                      <h1>
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
                      </h1>
                    </div>
                    <div className="border border-1 py-2 px-2">
                      <h1>
                        {" "}
                        {fetchAdjustment?.reference
                          ? fetchAdjustment?.reference
                          : "N/A"}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-primary">
                    <thead>
                      <tr>
                        <th scope="col">Product Name</th>
                        <th scope="col">Code</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedData.map((item, index) => (
                        <tr key={item?._id} className="">
                          <td scope="row">{item?.material_id?.materialName}</td>
                          <td>{item?.material_id?.materialCode}</td>
                          <td>{item?.quantity}</td>
                          <td>
                            {item?.type === "add" ? "(+)" : "(-)"} {item?.type}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <button
                    className="btn btn-info btn-md text-white "
                    onClick={() => {
                      setSelectedData(null), setShowModal(false);
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
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-1/3">
              <h2 className="text-lg font-semibold mb-4">Edit Category</h2>
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
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
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
                className="border border-gray-300 rounded-lg p-2 w-full mb-4"
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleEditCategory}
                >
                  Save Changes
                </button>
                <button
                  className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-lg ml-2"
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

import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { apiURL } from "../context/verifyStore";
import verify from "../context/verifyStore";
import { toast } from "react-toastify";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState(""); // New category input
  const [showModal, setShowModal] = useState(false);
  const { token } = verify();
  const [selectedData, setSelectedData] = useState(null);
  const [modalType, setModalType] = useState(""); // To determine if modal is for "add" or "delete"
  const [editCategory, setEditCategory] = useState({
    category_name: "",
    category_code: "",
  });
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/category/`, {
        headers: { token: token },
      });
      setCategories(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: categories,
      columns: [
        { title: "Category ID", data: "_id" },
        { title: "Code", data: "category_code" },
        { title: "Category Name", data: "category_name" },
        {
          title: "Actions",
          data: null,
          render: (data) => {
            return `
              <button class="bg-yellow-500 hover:bg-yellow-400 text-white px-2 py-1 rounded-lg mx-1" id=updateBtn_${data._id}>Edit</button>
              <button class="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded-lg mx-1" id="deleteBtn_${data._id}">Delete</button>
            `;
          },
        },
      ],
      order: [[1, "desc"]],
      rowCallback: (row, data) => {
        // Attach an event listener to the delete button for each row
        const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);
        const updateBtn = row.querySelector(`#updateBtn_${data._id}`);

        deleteBtn.addEventListener("click", () => {
          setSelectedData(data);
          setModalType("delete"); // Set modal for delete
          setShowModal(true); // Show the modal
        });

        updateBtn.addEventListener("click", () => {
          setSelectedData(data);
          setEditCategory({
            category_name: data.category_name,
            category_code: data.category_code,
          });
          setModalType("edit"); // Set modal for delete
          setShowModal(true); // Show the modal
        });
      },
    });

    return () => {
      table.destroy(); // Clean up to avoid memory leaks
    };
  }, [categories]);

  const handleDelete = async (dataId) => {
    console.log(dataId);
    try {
      const response = await axios.delete(
        `${apiURL}/api/category/deleteCategory/${dataId}`
      );
      fetchCategories();
      toast.info(response.data.message);
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  const handleAddCategory = async () => {
    try {
      const response = await axios.post(
        `${apiURL}/api/category/createCategory`,
        { category_name: newCategory },
        { headers: { token: token } }
      );
      fetchCategories();
      toast.success(response.data.message);
      setShowModal(false); // Close modal on success
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
      fetchCategories();
      toast.success(response.data.message);
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response.data.message);
    }
  };

  return (
    <div className="bg-white h-auto w-full p-5">
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-600 hover:bg-blue-500 duration-200 text-white w-40 h-10 rounded-lg"
          onClick={() => {
            setNewCategory(""); // Reset input field
            setModalType("add"); // Set modal for add
            setShowModal(true); // Open the modal
          }}
        >
          Add Category +
        </button>
      </div>
      <div className="divider"></div>
      <table id="myTable" className="display w-full"></table>

      {/* Add/Edit Modal */}
      {showModal && modalType === "add" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category Name"
              className="border border-gray-300 rounded-lg p-2 w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddCategory} // Add the category
              >
                Add
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-lg ml-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showModal && modalType === "delete" && selectedData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 w-1/3">
            <h3 className="text-lg font-bold">{selectedData.category_code}</h3>
            <p className="py-4">
              Are you sure you want to{" "}
              <span className="text-red-500 font-bold">delete</span> the
              category{" "}
              <span className="font-bold">{selectedData.category_name}</span>?
              This action cannot be undone and will permanently remove the
              category from the system.
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
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleEditCategory}
              >
                Save
              </button>
              <button
                className="bg-gray-400 hover:bg-gray-300 text-white px-4 py-2 rounded-lg ml-2"
                onClick={() => setShowModal(false)}
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

export default Category;

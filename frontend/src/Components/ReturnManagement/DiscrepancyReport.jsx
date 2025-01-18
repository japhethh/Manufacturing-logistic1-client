import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import Store from "../../context/Store";
import { toast } from "react-toastify";
import { apiURL } from "../../context/Store";
import { NavLink, useNavigate } from "react-router-dom";

const DiscrepancyReport = () => {
  const [discrepancyData, setDiscrepancyData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { token, userData, fetchUserData } = Store();
  const [selectedData, setSelectedData] = useState(null);
  const [fetchAdjustment, setFetchAdjustment] = useState();
  const [modalType, setModalType] = useState("");
  const [editCategory, setEditCategory] = useState({
    category_name: "",
    category_code: "",
  });
  const [selectImage, setSelectImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false); // New state for image modal
  const navigate = useNavigate();
  const isAdmin = userData?.role === "admin";
  const isSuperAdmin = userData?.role === "superAdmin";

  const fetchDiscrepancyReport = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/defect/vendor`, {
        headers: { token: token },
      });
      setDiscrepancyData(response.data);
      console.log(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching data");
    }
  };

  const handleImage = (image) => {
    setSelectImage(image);
    setShowImageModal(true); // Show the image modal
  };

  useEffect(() => {
    fetchDiscrepancyReport();
    fetchUserData();
  }, []);

  useEffect(() => {
    const table = new DataTable("#myTable", {
      data: discrepancyData,
      columns: [
        { title: "Created At", data: "defectCode" },
        { title: "Defect Description", data: "defectDescription" },
        { title: "Severity", data: "severity" },
        {
          title: "Actions",
          data: null,
          render: (data, type, row) => `
          <div class="flex justify-center gap-2"> 
            <button class="bg-blue-700 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="detailBtn_${
              row._id
            }">
              <i class="fas fa-eye"></i>
            </button>
            ${
              isSuperAdmin
                ? `<button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="deleteBtn_${row._id}">
            <i class="fas fa-trash-alt"></i>
          </button>`
                : ""
            }
            
          </div>
          `,
        },
      ],
      order: [[0, "desc"]],
      rowCallback: (row, data) => {
        const detailBtn = row.querySelector(`#detailBtn_${data._id}`);
        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("detail");
            setShowModal(true);
            setFetchAdjustment(data);
          });
        }
        if (isSuperAdmin) {
          const deleteBtn = row.querySelector(`#deleteBtn_${data._id}`);

          deleteBtn.addEventListener("click", () => {
            setSelectedData(data);
            setModalType("delete");
            setShowModal(true);
          });
        }
      },
    });

    return () => {
      table.destroy();
    };
  }, [discrepancyData]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${apiURL}/api/defect/vendor/delete/${id}`,
        {
          headers: { token: token },
        }
      );
      toast.warn(response.data.message);
      fetchDiscrepancyReport();
      setShowModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="bg-base-200 h-auto w-full p-5">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <NavLink to="/" className="text-blue-600">
              <a>Dashboard</a>
            </NavLink>
          </li>
          <li>
            <a>Documents</a>
          </li>
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
        <div className="overflow-x-auto">
          <table id="myTable" className="display w-full"></table>
        </div>

        {/* Delete Modal */}
        {showModal && modalType === "delete" && selectedData && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-5 w-11/12 sm:w-1/3">
              <h3 className="text-lg font-bold">Adjustment</h3>
              <p className="py-4">
                Are you sure you want to{" "}
                <span className="text-red-500 font-bold">delete</span> the
                category{" "}
                <span className="font-bold">{selectedData?.defectCode}</span>?
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

        {/* Detail Modal */}
        {showModal &&
          modalType === "detail" &&
          selectedData &&
          fetchAdjustment && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg p-5 w-11/12 sm:w-1/2 lg:w-1/3">
                <div className="grid grid-cols-2 gap-4">
                  {selectedData?.images.map((item, index) => (
                    <div key={index}>
                      <img
                        className="w-32 cursor-pointer"
                        onClick={() => handleImage(item)}
                        src={item}
                        alt="Images"
                      />
                    </div>
                  ))}
                </div>
                <h1 className="text-2xl font-semibold py-1">Details</h1>
                <div className="flex flex-col space-y-2">
                  <div className="flex">
                    <div className="w-1/2 border-2 p-2">Reference</div>
                    <div className="w-1/2 border-2 p-2">
                      {selectedData?.defectCode}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 border-2 p-2">Defect Description</div>
                    <div className="w-1/2 border-2 p-2">
                      {selectedData?.defectDescription}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="w-1/2 border-2 p-2">Severity</div>
                    <div className="w-1/2 border-2 p-2">
                      {selectedData?.severity}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end py-3">
                  <button
                    className="btn btn-info btn-md text-white "
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

        {/* Full-Screen Image Modal */}
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
    </div>
  );
};

export default DiscrepancyReport;

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
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const response = await axios.get(`${apiURL}/api/defect/vendor`, {
        headers: { token: token },
      });
      setDiscrepancyData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching data");
    } finally {
      setLoading(false);
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
                ? `<button class="bg-red-500 text-xs text-white px-2 py-1 rounded-lg cursor-pointer" id="deleteBtn_${data._id}">
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

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-full w-full">
  //       <span className="loading loading-dots loading-lg"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-base-200 h-auto w-full p-5">
      <div className="breadcrumbs text-sm mb-4 shadow-md bg-white p-4">
        <ul>
          <li>
            <NavLink to="/" className="text-blue-600">
              <a className="font-Roboto">Dashboard</a>
            </NavLink>
          </li>
          <li>
            <a className="font-Roboto">Documents</a>
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
              <h3 className="text-lg font-bold font-Roboto">Adjustment</h3>
              <p className="py-4 font-Roboto">
                Are you sure you want to{" "}
                <span className="text-red-500 font-bold font-Roboto">
                  delete
                </span>{" "}
                the category{" "}
                <span className="font-bold font-Roboto">
                  {selectedData?.defectCode}
                </span>
                ?
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
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg overflow-hidden">
                {/* Image Grid */}
                <div className="grid grid-cols-2 gap-3 overflow-auto max-h-60 mb-4 p-2">
                  {selectedData?.images.map((item, index) => (
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
                    <div className="w-1/2 p-2">{selectedData?.defectCode}</div>
                  </div>

                  <div className="flex border rounded-lg overflow-hidden">
                    <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                      Defect Description
                    </div>
                    <div className="w-1/2 p-2">
                      {selectedData?.defectDescription}
                    </div>
                  </div>

                  <div className="flex border rounded-lg overflow-hidden">
                    <div className="w-1/2 bg-gray-100 p-2 font-Roboto font-medium">
                      Severity
                    </div>
                    <div className="w-1/2 p-2">{selectedData?.severity}</div>
                  </div>
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

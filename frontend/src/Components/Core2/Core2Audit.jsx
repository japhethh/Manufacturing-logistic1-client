import { useEffect, useState } from "react";
import DataTable from "datatables.net-dt";
import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../context/Store";

const Core2Audit = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}audit/auditLogisticLog/core2-audit`
      );
      setData(response.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch data");
    }
  };

  useEffect(() => {
    if (data.length === 0) return;

    const table = new DataTable("#myTable", {
      data: data,
      columns: [
        {
          title: "Department",
          data: "department",
          className: "text-sm",
        },
        {
          title: "Description",
          data: "description",
          className: "text-sm truncate max-w-[200px]",
        },
        {
          title: "Responses",
          data: "responses",
          render: function (data) {
            return data ? data.length : 0;
          },
          className: "text-sm text-center",
        },
        {
          title: "Completed At",
          data: "completedAt",
          render: function (data) {
            return data ? new Date(data).toLocaleString() : "";
          },
          className: "text-sm",
        },
        {
          title: "Image",
          data: "responses",
          render: function (data) {
            const hasImage = data.some((response) => response.image);
            return hasImage
              ? '<span class="text-green-600 font-semibold">Yes</span>'
              : '<span class="text-red-600">No</span>';
          },
          className: "text-sm text-center",
        },
        {
          title: "Action",
          data: null,
          render: function (data) {
            return `
              <button class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors flex items-center gap-1 text-xs" id="detailBtn_${data._id}">
                <i class="fas fa-eye"></i> Details
              </button>`;
          },
          className: "text-center",
        },
      ],
      rowCallback: (row, data) => {
        const detailBtn = row.querySelector(`#detailBtn_${data._id}`);
        if (detailBtn) {
          detailBtn.addEventListener("click", () => {
            setSelectedData(data);
            setShowModal(true);
          });
        }
      },
      responsive: true,
      pageLength: 10,
      lengthMenu: [5, 10, 25, 50],
      language: {
        search: "Filter records:",
        lengthMenu: "Show _MENU_ entries",
        info: "Showing _START_ to _END_ of _TOTAL_ entries",
      },
    });

    return () => table.destroy();
  }, [data]);

  const closeModal = () => {
    setSelectedData(null);
    setShowModal(false);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Audit Logs</h2>
      <div className="bg-white shadow-md rounded-lg ">
        <table id="myTable" className="display nowrap w-full" />
      </div>

      {/* Improved Detail Modal */}
      {showModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="bg-blue-50 p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">
                Audit Details - {selectedData.department}
              </h1>
            </div>

            {/* Modal Content */}
            <div className="p-6 grid md:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">{selectedData.description}</p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Completion Date
                  </h3>
                  <p className="text-gray-600">
                    {new Date(selectedData.completedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Right Column - Tasks and Responses */}
              <div className="space-y-4">
                {/* Tasks Section */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Tasks ({selectedData.task.length})
                  </h3>
                  <ul className="space-y-2">
                    {selectedData.task.map((task, index) => (
                      <li
                        key={index}
                        className="text-gray-600 pb-2 border-b last:border-b-0"
                      >
                        <span className="font-medium mr-2">
                          Task {index + 1}:
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responses Section */}
                <div className="bg-gray-100 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Responses ({selectedData.responses.length})
                  </h3>
                  {selectedData.responses.map((response, index) => (
                    <div
                      key={response._id}
                      className="mb-4 pb-4 border-b last:border-b-0"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">
                          Response {index + 1}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(response.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{response.text}</p>
                      {response.image && (
                        <div className="mt-2">
                          <img
                            src={response.image}
                            alt={`Response ${index + 1}`}
                            className="rounded-lg max-h-64 w-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Core2Audit;

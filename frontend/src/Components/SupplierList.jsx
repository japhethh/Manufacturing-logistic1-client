import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import { FiEdit, FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi";

const SupplierList = () => {
  const { apiURL } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // Modal state for delete confirmation
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  // Pagination and sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({
    key: "supplierName",
    direction: "ascending",
  });

  // Fetch suppliers from API
  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
        setSuppliers(response.data);
      } catch (error) {
        setError("Error fetching suppliers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSuppliers();
  }, [apiURL]);

  const handleToggleRow = (supplierId) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      newExpandedRows.has(supplierId)
        ? newExpandedRows.delete(supplierId)
        : newExpandedRows.add(supplierId);
      return newExpandedRows;
    });
  };

  const handleEdit = (supplierId) => {
    console.log("Editing supplier:", supplierId);
  };

  const handleDelete = (supplierId) => {
    // Show the delete modal and set the supplier to delete
    setSupplierToDelete(supplierId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${apiURL}/api/supplier/${supplierToDelete}`);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.filter((supplier) => supplier._id !== supplierToDelete)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting supplier:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSupplierToDelete(null);
  };

  // Filter suppliers based on the search query
  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.materialSupplied.some((material) =>
      material.materialName.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Sorting functionality
  const sortedSuppliers = () => {
    let sorted = [...filteredSuppliers];
    if (sortConfig) {
      sorted.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        return sortConfig.direction === "ascending"
          ? aValue < bValue
            ? -1
            : 1
          : aValue > bValue
          ? -1
          : 1;
      });
    }
    return sorted;
  };

  const requestSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "ascending"
        ? "descending"
        : "ascending";
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = sortedSuppliers().slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  return (
    <div className="p-6 w-full max-w-full">
      <div className="flex justify-end w-full mb-4">
        <button className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition">
          Create Request
        </button>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search materials..."
          className="px-4 py-2 border rounded-lg w-full bg-white z-10 relative"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg w-full">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white border table table-xs border-gray-200 w-full">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="w-10 px-4 py-2"></th>
                {[
                  "supplierName",
                  "supplierCode",
                  "contactPerson",
                  "contactEmail",
                  "contactPhone",
                  "address",
                  "paymentTerms",
                  "rating",
                ].map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 cursor-pointer text-left"
                    onClick={() => requestSort(key)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                      {sortConfig.key === key &&
                        (sortConfig.direction === "ascending" ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        ))}
                    </div>
                  </th>
                ))}
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentSuppliers.length > 0 ? (
                currentSuppliers.map((supplier) => (
                  <React.Fragment key={supplier._id}>
                    <tr
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleToggleRow(supplier._id)}
                    >
                      <th className="px-4 py-2">
                        {expandedRows.has(supplier._id) ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </th>
                      <td className="px-4 py-2">{supplier.supplierName}</td>
                      <td className="px-4 py-2">{supplier.supplierCode}</td>
                      <td className="px-4 py-2">{supplier.contactPerson}</td>
                      <td className="px-4 py-2">{supplier.contactEmail}</td>
                      <td className="px-4 py-2">{supplier.contactPhone}</td>
                      <td className="px-4 py-2">{`${supplier.address.street}, ${supplier.address.city}`}</td>
                      <td className="px-4 py-2">{supplier.paymentTerms}</td>
                      <td className="px-4 py-2">{supplier.rating}</td>
                      <td className="py-2 px-4 flex space-x-1">
                        <button
                          className="bg-green-600 text-white px-4 py-2 rounded flex justify-center items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(supplier._id);
                          }}
                        >
                          <FiEdit /> Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-4 py-2 rounded font-semibold  flex justify-center items-center"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(supplier._id);
                          }}
                        >
                          <FiTrash className="inline " /> Delete
                        </button>
                      </td>
                    </tr>
                    {expandedRows.has(supplier._id) && (
                      <tr>
                        <td colSpan="10" className="bg-gray-50">
                          <div className="p-4">
                            <h4 className="text-lg font-semibold mb-2">
                              Materials
                            </h4>
                            <table className="min-w-full border">
                              <thead className="bg-gray-200">
                                <tr>
                                  <th className="px-4 py-2">Material Name</th>
                                  <th className="px-4 py-2">Unit</th>
                                  <th className="px-4 py-2">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {supplier.materialSupplied.map((material) => (
                                  <tr
                                    key={material._id}
                                    className="border-b hover:bg-gray-50"
                                  >
                                    <td className="px-4 py-2">
                                      {material.materialName}
                                    </td>
                                    <td className="px-4 py-2">
                                      {material.unit}
                                    </td>
                                    <td className="px-4 py-2 text-green-500 font-semibold">
                                      {material.pricePerUnit}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No suppliers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

        {/* Pagination */}
        <div className="mt-4 pb-3 flex justify-center items-center space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-lg ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-blue-500 hover:text-white"
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete this supplier?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierList;

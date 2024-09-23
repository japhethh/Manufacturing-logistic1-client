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

  // Pagination and sorting states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: "supplierName", direction: "ascending" });

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

  // Reset expanded rows when search query changes
  useEffect(() => {
    setExpandedRows(new Set());
  }, [searchQuery]);

  const handleToggleRow = (supplierId) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      newExpandedRows.has(supplierId) ? newExpandedRows.delete(supplierId) : newExpandedRows.add(supplierId);
      return newExpandedRows;
    });
  };

  const handleEdit = (supplierId) => {
    console.log("Editing supplier:", supplierId);
  };

  const handleDelete = (supplierId) => {
    console.log("Deleting supplier:", supplierId);
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
          ? aValue < bValue ? -1 : 1
          : aValue > bValue ? -1 : 1;
      });
    }
    return sorted;
  };

  const requestSort = (key) => {
    const direction = (sortConfig.key === key && sortConfig.direction === "ascending") ? "descending" : "ascending";
    setSortConfig({ key, direction });
  };

  // Pagination logic
  const indexOfLastSupplier = currentPage * itemsPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - itemsPerPage;
  const currentSuppliers = sortedSuppliers().slice(indexOfFirstSupplier, indexOfLastSupplier);
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  return (
    <div className="p-6">
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
          className="px-4 py-2 border rounded-lg w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr className="text-gray-700">
                <th className="w-10 px-4 py-2"></th>
                <th className="w-1/4 px-4 py-2 cursor-pointer" onClick={() => requestSort("supplierName")}>
                  Name {sortConfig.key === "supplierName" ? (sortConfig.direction === "ascending" ? '▲' : '▼') : ''}
                </th>
                <th className="w-1/6 px-4 py-2 cursor-pointer" onClick={() => requestSort("supplierCode")}>
                  Code {sortConfig.key === "supplierCode" ? (sortConfig.direction === "ascending" ? '▲' : '▼') : ''}
                </th>
                <th className="w-1/6 px-4 py-2">Contact</th>
                <th className="w-1/4 px-4 py-2">Email</th>
                <th className="w-1/6 px-4 py-2">Phone</th>
                <th className="w-1/4 px-4 py-2">Address</th>
                <th className="w-1/6 px-4 py-2">Terms</th>
                <th className="w-1/6 px-4 py-2">Rating</th>
                <th className="w-1/6 px-4 py-2">Actions</th>
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
                        {expandedRows.has(supplier._id) ? <FiChevronUp /> : <FiChevronDown />}
                      </th>
                      <td className="px-4 py-2">{supplier.supplierName}</td>
                      <td className="px-4 py-2">{supplier.supplierCode}</td>
                      <td className="px-4 py-2">{supplier.contactPerson}</td>
                      <td className="px-4 py-2">{supplier.contactEmail}</td>
                      <td className="px-4 py-2">{supplier.contactPhone}</td>
                      <td className="px-4 py-2">{`${supplier.address.street}, ${supplier.address.city}`}</td>
                      <td className="px-4 py-2">{supplier.paymentTerms}</td>
                      <td className="px-4 py-2">{supplier.rating}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(supplier._id);
                          }}
                        >
                          <FiEdit />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(supplier._id);
                          }}
                        >
                          <FiTrash />
                        </button>
                      </td>
                    </tr>
                    {expandedRows.has(supplier._id) && (
                      <tr>
                        <td colSpan="10" className="bg-gray-50">
                          <div className="p-4">
                            <h4 className="text-lg font-semibold mb-2">Materials</h4>
                            <table className="min-w-full border">
                              <thead className="bg-gray-200">
                                <tr>
                                  <th className="border">Material Name</th>
                                  <th className="border">Unit</th>
                                  <th className="border">Available</th>
                                </tr>
                              </thead>
                              <tbody>
                                {supplier.materialSupplied && supplier.materialSupplied.length > 0 ? (
                                  supplier.materialSupplied.map((material, idx) => (
                                    <tr key={idx} className="border-b">
                                      <td className="border">{material.materialName}</td>
                                      <td className="border">{material.unit}</td>
                                      <td className="border">{material.available}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td colSpan="3" className="text-center border">No materials available</td>
                                  </tr>
                                )}
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
                  <td colSpan="10" className="px-4 py-2 text-center">
                    No suppliers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button 
          className="px-4 py-2 text-sm rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="px-4 py-2 text-sm rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SupplierList;

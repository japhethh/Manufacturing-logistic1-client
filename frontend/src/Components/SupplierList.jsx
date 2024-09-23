import axios from "axios";
import { useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { FiEdit, FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi";

const SupplierList = () => {
  const { apiURL } = useContext(UserContext);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRows, setExpandedRows] = useState([]);

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
  }, []);

  const handleToggleRow = (supplierId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(supplierId)
        ? prevExpandedRows.filter((id) => id !== supplierId)
        : [...prevExpandedRows, supplierId]
    );
  };

  const handleEdit = (supplierId) => {
    console.log("Editing supplier:", supplierId);
  };

  const handleDelete = (supplierId) => {
    console.log("Deleting supplier:", supplierId);
  };

  return (
    <div className="p-6">
      <div className="flex justify-end w-full mb-4">
        <button className="px-4 py-2 text-sm rounded-full bg-blue-700 text-white hover:bg-blue-600 transition">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="table w-full text-sm border table-xs">
            <thead>
              <tr className="text-gray-700 bg-stone-200">
                <th className="px-4 py-2"></th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Terms</th>
                <th className="px-4 py-2">Rating</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, index) => (
                  <tbody key={supplier._id}>
                    <tr>
                      <th className="px-4 py-2">
                        <button
                          onClick={() => handleToggleRow(supplier._id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedRows.includes(supplier._id) ? (
                            <FiChevronUp />
                          ) : (
                            <FiChevronDown />
                          )}
                        </button>
                      </th>
                      <td className="px-4 py-2 border">{supplier.supplierName}</td>
                      <td className="px-4 py-2 border">{supplier.supplierCode}</td>
                      <td className="px-4 py-2 border">{supplier.contactPerson}</td>
                      <td className="px-4 py-2 border">{supplier.contactEmail}</td>
                      <td className="px-4 py-2 border">{supplier.contactPhone}</td>
                      <td className="px-4 py-2 border">{`${supplier.address.street}, ${supplier.address.city}`}</td>
                      <td className="px-4 py-2 border">{supplier.paymentTerms}</td>
                      <td className="px-4 py-2 border">{supplier.rating}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 transition mr-2"
                          onClick={() => handleEdit(supplier._id)}
                        >
                          <FiEdit className="inline-block" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 transition"
                          onClick={() => handleDelete(supplier._id)}
                        >
                          <FiTrash className="inline-block" />
                        </button>
                      </td>
                    </tr>
                    {expandedRows.includes(supplier._id) && (
                      <tr>
                        <td colSpan="10">
                          <div className="p-4 bg-gray-50">
                            <h4 className="text-lg font-semibold mb-2">Materials</h4>
                            <table className="table-auto w-full text-sm">
                              <thead>
                                <tr>
                                  <th>Material Name</th>
                                  <th>Unit</th>
                                  <th>Available</th>
                                </tr>
                              </thead>
                              <tbody>
                                {supplier.materialSupplied &&
                                  supplier.materialSupplied.map((material, idx) => (
                                    <tr key={idx}>
                                      <td>{material.materialName}</td>
                                      <td>{material.unit}</td>
                                      <td>{material.available}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
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
    </div>
  );
};

export default SupplierList;

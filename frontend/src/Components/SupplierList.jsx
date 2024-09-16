import axios from "axios";
import { useEffect, useState } from "react";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/supplier/suppliers"
        );
        setSuppliers(response.data);
      } catch (error) {
        setError("Error fetching suppliers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-end w-full mb-4">
        <button className="px-4 py-2 text-sm rounded-full bg-blue-700 text-white">
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
                <th className="px-4 py-2">Materials</th>
                <th className="px-4 py-2">Unit</th>
                <th className="px-4 py-2">Available</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, index) => (
                  <tr key={index}>
                    <th className="px-4 py-2">{index + 1}</th>
                    <td className="px-4 py-2 border">{supplier.supplierName}</td>
                    <td className="px-4 py-2 border">{supplier.supplierCode}</td>
                    <td className="px-4 py-2 border">{supplier.contactPerson}</td>
                    <td className="px-4 py-2 border">{supplier.contactEmail}</td>
                    <td className="px-4 py-2 border">{supplier.contactPhone}</td>
                    <td className="px-4 py-2 border">{`${supplier.address.street}, ${supplier.address.city}`}</td>
                    <td className="px-4 py-2 border">{supplier.paymentTerms}</td>
                    <td className="px-4 py-2 border">{supplier.rating}</td>
                    <td className="px-4 py-2 border">
                      {supplier.materialSupplied &&
                        supplier.materialSupplied.map((material, idx) => (
                          <div key={idx}>{material.materialName}</div>
                        ))}
                    </td>
                    <td className="px-4 py-2">
                      {supplier.materialSupplied &&
                        supplier.materialSupplied.map((material, idx) => (
                          <div key={idx}>{material.unit}</div>
                        ))}
                    </td>
                    <td className="px-4 py-2">
                      {supplier.materialSupplied &&
                        supplier.materialSupplied.map((material, idx) => (
                          <div key={idx}>{material.available}</div>
                        ))}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-4 py-2 text-center">
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

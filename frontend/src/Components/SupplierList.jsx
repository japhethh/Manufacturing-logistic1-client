import axios from "axios";
import { useEffect, useState } from "react";

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/supplier/suppliers"
        );
        setSuppliers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching suppliers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-end w-full mb-2">
        <button className="px-3 py-2 text-blue-700 duration-150 border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white">
          Create Request
        </button>
      </div>

      <div className="overflow-x-auto">
        {loading ? (
          <div className="py-4 text-center">Loading...</div>
        ) : error ? (
          <div className="py-4 text-center text-red-500">{error}</div>
        ) : (
          <table className="table w-full border-collapse table-xs">
            {/* head */}
            <thead>
              <tr className="bg-stone-200 text-black/70">
                <th className="px-4 py-2 border"></th>
                <th className="px-4 py-2 border">Supplier Name</th>
                <th className="px-4 py-2 border">Supplier Code</th>
                <th className="px-4 py-2 border">Contact Person</th>
                <th className="px-4 py-2 border">Contact Email</th>
                <th className="px-4 py-2 border">Contact Phone</th>
                <th className="px-4 py-2 border">Address</th>
                {/* new */}
                <th className="px-4 py-2 border">Payment Terms</th>
                <th className="px-4 py-2 border">Rating</th>
                <th className="px-4 py-2 border">Material Supplied</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Password</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length > 0 ? (
                suppliers.map((supplier, index) => (
                  <tr key={index} className="bg-base-100">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-4 py-2 border">
                      {supplier.supplierName}
                    </td>
                    <td className="px-4 py-2 border">
                      {supplier.supplierCode}
                    </td>
                    <td className="px-4 py-2 border">
                      {supplier.contactPerson}
                    </td>
                    <td className="px-4 py-2 border">
                      {supplier.contactEmail}
                    </td>
                    <td className="px-4 py-2 border">
                      {supplier.contactPhone}
                    </td>
                    {/* <td className="px-4 py-2 border">
                      {supplier.address.street},{supplier.address.city},
                      {supplier.address.state},{supplier.address.zipCode},
                      {supplier.address.country},
                    </td> */}
                    <td className="px-4 py-2 border">
                      {supplier.paymentTerms}
                    </td>
                    <td className="px-4 py-2 border">{supplier.rating}</td>
                    <td className="px-4 py-2 border">
                      {supplier.materialSupplied}
                    </td>
                    <td className="px-4 py-2 border">{supplier.email}</td>
                    <td className="px-4 py-2 border">{supplier.password}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="px-4 py-2 text-center border ">
                    No users found
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

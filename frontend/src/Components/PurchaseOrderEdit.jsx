import { useForm, useFieldArray } from "react-hook-form";
import { useContext, useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const PurchaseOrderEdit = () => {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const { purchaseOrderId } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const hasFetchedData = useRef(false);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/supplier/suppliers"
      );
      setSuppliers(response.data);
    } catch (error) {
      toast.error(
        "Failed to fetch suppliers: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const { apiURL, token } = context || {};
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      requestStatus: "Pending",
      requestedBy: "",
      items: [],
      deliveryDate: "",
      paymentTerms: "",
      orderNotes: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "items" });
  const items = watch("items", []);

  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const pricePerUnit = parseFloat(item.pricePerUnit) || 0;
      return sum + quantity * pricePerUnit;
    }, 0);
  }, [items]);

  useEffect(() => {
    const fetchPurchaseOrderData = async () => {
      try {
        if (!hasFetchedData.current) {
          setLoading(true);
          const response = await axios.get(
            `${apiURL}/api/rawmaterial/request/${purchaseOrderId}`
          );
          const data = response.data;

          setValue("requestStatus", data.requestStatus || "Pending");
          setValue("requestedBy", data.requestedBy || "");
          setValue("deliveryDate", data.deliveryDate || "");
          setValue("paymentTerms", data.paymentTerms || "");
          setValue("orderNotes", data.orderNotes || "");

          if (data.material && data.material.length > 0) {
            data.material.forEach((item) => {
              append({
                materialName: item.materialName || "",
                quantity: item.quantity || "",
                pricePerUnit: item.materialId?.pricePerUnit || "0",
                supplierId: item.supplierId || "",
                specifications: item.specifications || "",
              });
            });
          }

          hasFetchedData.current = true;
        }
      } catch (error) {
        toast.error(
          "Failed to fetch purchase order data: " +
            (error.response?.data?.message || error.message)
        );
      } finally {
        setLoading(false);
      }
    };

    if (purchaseOrderId) fetchPurchaseOrderData();
    fetchSuppliers();
  }, [purchaseOrderId, apiURL, setValue, append]);

  // const onSubmit = async (data) => {
  //   try {
  //     const payload = { ...data, totalAmount };
  //     if (!data.requestStatus) {
  //       delete payload.requestStatus;
  //     }

  //     await axios.put(`${apiURL}/api/purchaseorder/${purchaseOrderId}`, payload);
  //     toast.success("Updated Successfully");
  //     navigate("/purchase-orders");
  //   } catch (error) {
  //     toast.error("Update failed: " + (error.response?.data?.message || error.message));
  //   }
  // };

  const onSubmit = async (data) => {
    try {
      const payload = { ...data, totalAmount };

      await axios.post(`${apiURL}/api/purchaseorder/create`, payload, {
        headers: { token: token },
      });
      toast.success("Purchase Order Created Successfully");

      // Navigate to the purchase order view page (newly created order id can be obtained from the response)
      navigate(`/purchase-orders`);
    } catch (error) {
      toast.error(
        "Creation failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const refreshTotal = () => {
    setValue("items", [...items]); // Re-trigger memoization
  };

  return (
    <div className="container mx-auto px-4">
      <div className="breadcrumbs text-sm mb-5">
        <ul className="flex space-x-2">
          <li>
            <Link
              to="/purchase-orders"
              className="text-blue-600 hover:underline"
            >
              Purchase Orders
            </Link>
          </li>
          <li className="text-gray-500">/ Edit Purchase Order</li>
        </ul>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative min-h-screen pb-12"
      >
        <div className="p-4 shadow-md bg-white rounded-md">
          <h2 className="text-xl font-semibold mb-4">Edit Purchase Order</h2>

          <div className="mb-5">
            <label
              htmlFor="requestedBy"
              className="mb-2 block text-base font-medium"
            >
              Requested By
            </label>
            <input
              type="text"
              id="requestedBy"
              placeholder="Requested By"
              className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("requestedBy", {
                required: "This field is required",
              })}
            />
            {errors.requestedBy && (
              <span className="text-red-500">{errors.requestedBy.message}</span>
            )}
          </div>

          <div className="flex gap-3">
            <div className="mb-5 flex-1">
              <label
                htmlFor="requestStatus"
                className="mb-2 block text-base font-medium"
              >
                Request Status
              </label>
              <select
                id="requestStatus"
                className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("requestStatus")}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="mb-5 flex-1">
              <label
                htmlFor="deliveryDate"
                className="mb-2 block text-base font-medium"
              >
                Delivery Date
              </label>
              <input
                type="date"
                id="deliveryDate"
                className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                {...register("deliveryDate")}
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="paymentTerms"
              className="mb-2 block text-base font-medium"
            >
              Payment Terms
            </label>
            <input
              type="text"
              id="paymentTerms"
              placeholder="e.g., Net 30"
              className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("paymentTerms")}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="orderNotes"
              className="mb-2 block text-base font-medium"
            >
              Order Notes
            </label>
            <textarea
              id="orderNotes"
              rows="3"
              className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("orderNotes")}
            />
          </div>

          {/* Dynamic Items Section */}
          <table className="w-full mb-5 border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2">Material Name</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Price Per Unit</th>
                <th className="py-2">Total Price</th>
                <th className="py-2">Supplier</th>
                <th className="py-2">Specifications</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((item, index) => {
                const quantity = parseFloat(item.quantity) || 0;
                const pricePerUnit = parseFloat(item.pricePerUnit) || 0;
                const totalPrice = quantity * pricePerUnit;

                return (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="text"
                        placeholder="Material Name"
                        className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register(`items[${index}].materialName`, {
                          required: "This field is required",
                        })}
                      />
                      {errors.items?.[index]?.materialName && (
                        <span className="text-red-500">
                          {errors.items[index].materialName.message}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Quantity"
                        className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register(`items[${index}].quantity`, {
                          required: "This field is required",
                          min: {
                            value: 0,
                            message: "Quantity cannot be negative",
                          },
                        })}
                      />
                      {errors.items?.[index]?.quantity && (
                        <span className="text-red-500">
                          {errors.items[index].quantity.message}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="Price Per Unit"
                        className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register(`items[${index}].pricePerUnit`, {
                          required: "This field is required",
                          min: {
                            value: 0,
                            message: "Price cannot be negative",
                          },
                        })}
                      />
                      {errors.items?.[index]?.pricePerUnit && (
                        <span className="text-red-500">
                          {errors.items[index].pricePerUnit.message}
                        </span>
                      )}
                    </td>
                    <td>{totalPrice.toFixed(2)}</td>
                    <td>
                      <select
                        className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register(`items[${index}].supplierId`, {
                          required: "This field is required",
                        })}
                      >
                        <option value="">Select Supplier</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier._id} value={supplier._id}>
                            {supplier.name} - {supplier.company}
                          </option>
                        ))}
                      </select>
                      {errors.items?.[index]?.supplierId && (
                        <span className="text-red-500">
                          {errors.items[index].supplierId.message}
                        </span>
                      )}
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Specifications"
                        className="w-full rounded-md border py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        {...register(`items[${index}].specifications`)}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex items-center justify-between mb-5 border-t pt-5">
            <button
              type="button"
              onClick={() =>
                append({
                  materialName: "",
                  quantity: "",
                  pricePerUnit: "",
                  supplierId: "",
                  specifications: "",
                })
              }
              className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-200"
            >
              <span>Add Item</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={refreshTotal}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
            >
              Refresh Total
            </button>
          </div>

          {/* Total Amount */}
          <div className="mb-5">
            <label
              htmlFor="totalAmount"
              className="block text-base font-medium"
            >
              Total Amount
            </label>
            <input
              type="text"
              id="totalAmount"
              readOnly
              value={totalAmount.toFixed(2)}
              className="w-full rounded-md border py-2 px-4"
            />
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              to="/purchase-orders"
              className="text-white bg-gray-500 px-4 py-2 rounded-md"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="text-white bg-blue-500 px-4 py-2 rounded-md"
            >
              Update
            </button>
          </div>
        </div>
      </form>

      {loading && (
        <div className="absolute inset-0 bg-white opacity-75 flex items-center justify-center">
          Loading...
        </div>
      )}
    </div>
  );
};

export default PurchaseOrderEdit;

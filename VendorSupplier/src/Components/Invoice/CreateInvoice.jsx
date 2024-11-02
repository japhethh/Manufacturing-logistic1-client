import { Link } from "react-router-dom";
import axios from "axios";
import verifyStore, { apiURL } from "../../context/verifyStore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const CreateInvoice = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [materialData, setMaterialData] = useState([]);
  const [logisticUsers, setLogisticUsers] = useState([]);
  const [items, setItems] = useState([
    { product: "", quantity: null, discount: null },
  ]);
  const { token } = verifyStore();

  // UseEffect for fetching products and logistic customers
  useEffect(() => {
    fetchProducts();
    fetchLogisticCustomer();
  }, []);

  // Fetching material | Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/material/getAllMaterial`,
        {
          headers: { token: token },
        }
      );
      setMaterialData(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  // Fetching logistic customers
  const fetchLogisticCustomer = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/user/getAllUsers`);
      if (response.data.success) {
        setLogisticUsers(response.data.data);
      }
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  const handleAddItem = () => {
    setItems([...items, { product: "", quantity: null, discount: null }]);
  };

  const handleRemoveItem = (idx) => {
    const newItems = items.filter((_, index) => index !== idx);
    setItems(newItems);
  };

  const onSubmit = async (data) => {
    // Attach items to data
    data.items = items;
    console.log(data);

    try {
      const response = await axios.post(
        `${apiURL}/api/invoices/manualCreate`,
        data,
        {
          headers: { token: token },
        }
      );
      toast.success(response.data.message);
      reset();
      setItems([
        {
          product: null,
          quantity: null,
          discount: null,
        },
      ]);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  return (
    <div className="mx-5">
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm p-4">
        <ul>
          <li>
            <Link to="/paymentList">
              <span className="text-gray-500 font-semibold underline">
                All payments
              </span>
            </Link>
          </li>
          <li>Example Main</li>
        </ul>
      </div>

      {/* Create Invoice */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create Invoice 
        </h2>
        <h2 className="text-5xl font-semibold text-gray-700 mb-4">
          On Going...
        </h2>

        {/* <button onClick={handleAddItem} className="btn btn-primary">
          Add item
        </button> */}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Customer Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Customer
                </span>
              </label>
              <select
                {...register("customer", { required: "Required to choose" })}
                className="select select-bordered w-full bg-gray-50"
              >
                <option value="">Select option</option>
                {logisticUsers?.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {errors.customer && (
                <span className="text-red-500 text-sm">
                  {errors.customer.message}
                </span>
              )}
            </div>

            {/* Payment Details */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Payment Method
                </span>
              </label>
              <select
                id="paymentMethod"
                {...register("paymentMethod", {
                  required: "Required to Payment Method",
                })}
                className="select select-bordered w-full bg-gray-50"
              >
                <option value="">Select option</option>
                <option value="GCash">GCash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
              {errors.paymentMethod && (
                <span className="text-red-500 text-sm">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>
          </div>

          {/* Items Input */}
          <div>
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                {/* Products */}
                <div>
                  <label className="label">
                    <span className="label-text text-black/70 font-medium">
                      Products
                    </span>
                  </label>
                  <select
                    {...register(`items.${idx}.product`, {
                      required: "Required",
                    })}
                    value={item.product}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx].product = e.target.value;
                      setItems(newItems);
                    }}
                    className="select select-bordered w-full bg-gray-50"
                  >
                    <option value="">Select option</option>
                    {materialData.map((mat) => (
                      <option key={mat._id} value={mat._id}>
                        {mat.materialName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label className="label">
                    <span className="label-text text-black/70 font-medium">
                      Quantity
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register(`items.${idx}.quantity`, {
                      required: "Required",
                    })}
                    className="input input-bordered w-full bg-gray-50"
                    placeholder="Enter quantity"
                    value={item.quantity || ""}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx].quantity = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </div>

                {/* Discount */}
                <div>
                  <label className="label">
                    <span className="label-text text-black/70 font-medium">
                      Discount
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register(`items.${idx}.discount`)}
                    value={item.discount || ""}
                    className="input input-bordered w-full bg-gray-50"
                    placeholder="Enter discount"
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx].discount = e.target.value;
                      setItems(newItems);
                    }}
                  />
                </div>

                {/* Remove Item Button */}
                <div className="flex justify-center items-end gap-3">
                  <button
                    onClick={handleAddItem}
                    type="button"
                    className="btn btn-primary"
                  >
                    Add Item
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemoveItem(idx)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Amount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Invoice Amount
                </span>
              </label>
              <input
                type="number"
                {...register("totalAmount", {
                  required: "Required Enter Total Amount",
                })}
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Amount"
              />
              {errors.totalAmount && (
                <span className="text-red-500 text-sm">
                  {errors.totalAmount.message}
                </span>
              )}
            </div>
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-3 gap-2">
            {/* Due Date */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Due Date
                </span>
              </label>
              <input
                type="date"
                {...register("dueDate", {
                  required: "Required Enter Due Date",
                })}
                className="input input-bordered w-full bg-gray-50"
              />
              {errors.dueDate && (
                <span className="text-red-500 text-sm">
                  {errors.dueDate.message}
                </span>
              )}
            </div>

            {/* Tax */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Tax
                </span>
              </label>
              <input
                type="number"
                {...register("tax", { required: "Required Enter Tax" })}
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Tax"
              />
              {errors.tax && (
                <span className="text-red-500 text-sm">
                  {errors.tax.message}
                </span>
              )}
            </div>

            {/* Comments */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Comments
                </span>
              </label>
              <textarea
                {...register("comments")}
                className="textarea textarea-bordered w-full bg-gray-50"
                placeholder="Additional comments"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full mt-4">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;

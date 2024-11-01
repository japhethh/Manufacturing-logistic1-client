import { Link } from "react-router-dom";
import axios from "axios";
import verifyStore, { apiURL } from "../../context/verifyStore";
import {useForm} from 'react-hook-form'
const CreateInvoice = () => {


  const 
  {register, handleSubmit, formState:{errors}} = useForm();
  
  const onSubmit = async (data) => {
    console.log(data)
  }
  return (
    <div className="mx-5">
      {/* BreadCrumbs */}
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
      <div className="mb-8  bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create Invoice
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Customer
                </span>
              </label>
              <select {...register("customer",{required:"Required to choose"})} className="select select-bordered w-full bg-gray-50">
                <option value="" selected>Select option</option>
                <option value="Jhon">Jhon</option>
                <option value="Camel">Camel</option>
                <option value="Stella">Stella</option>
              </select>

              {errors.customer && (
                <span className="text-red-500 text-sm">
                  {errors.customer.message}
                  </span>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Payment Details
                </span>
              </label>
              <select
                name="paymentDetails"
                id="paymentDetails"
                className="select select-bordered w-full bg-gray-50"
              >
                <option value="GCash" selected>
                  GCash
                </option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {/* Payment Date */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Payment Date
                </span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full bg-gray-50"
              />
            </div>
            {/* Invoice Amount */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Invoice Amount
                </span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Amount"
              />
            </div>
          </div>

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
                name="dueDate"
                className="input input-bordered w-full bg-gray-50"
              />
            </div>

            {/* Invoice Amount */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Tax
                </span>
              </label>
              <input
                type="number"
                name="tax"
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Tax"
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
                name="discount"
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Discount"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Notes */}
            <div className="w-full">
              <label className="block mb-2">Notes</label>
              <textarea
                name="notes"
                className="textarea textarea-bordered min-w-full max-w-xs"
              ></textarea>
            </div>
            {/* Status */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Status
                </span>
              </label>
              <select
                name="status"
                id="status"
                className="select select-bordered w-full bg-gray-50"
              >
                <option value="Pending" selected>
                  Pending
                </option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
              </select>
            </div>

            {/* Shipping Charges */}
            <div>
              <label className="label">
                <span className="label-text text-black/70 font-medium">
                  Shipping Charges
                </span>
              </label>
              <input
                type="number"
                name="shippingCharges"
                className="input input-bordered w-full bg-gray-50"
                placeholder="Enter Shipping Charges"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Create Invoice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;

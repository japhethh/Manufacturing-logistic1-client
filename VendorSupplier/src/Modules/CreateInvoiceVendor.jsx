import React from "react";
import { IoMdCopy } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
const CreateInvoiceVendor = () => {
  return (
    <div className="bg-white w-full h-auto p-5">
      {/* Top */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-2xl font-medium">Invoice #Number</p>
          <IoMdCopy className="size-6 cursor-pointer" />
          <p className="bg-gray-400 rounded-full px-1">Draft</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="form-control">
            <label className="label cursor-pointer gap-2">
              <span className="font-medium text-lg">Reminders</span>
              <input type="checkbox" className="toggle" defaultChecked />
            </label>
          </div>
          <button className="px-3 py-1 bg-green-600 hover:bg-green-500 duration-150 rounded-lg text-white">
            Send For Approval
          </button>
          <NavLink to="/ordersvendor/ReceivingOrdersVendor">
            <IoClose className="size-6 cursor-pointer" />
          </NavLink>
        </div>
      </div>

      {/* TAB */}
      <div className="mt-5">
        <div role="tablist" className="tabs tabs-bordered">
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-medium text-medium text-black/60"
            aria-label="DETAILS"
          />
          {/* TAB 1 */}
          <div role="tabpanel" className="tab-content py-5">
            {/* Customer Details */}
            <div className="flex flex-row flex-wrap gap-5">
              {/* Customer Type */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Customer Type</span>
                </label>
                <select
                  className="select select-info w-full"
                  aria-label="Customer Type"
                >
                  <option value="" disabled selected>
                    Select Customer
                  </option>
                  <option>Supplier</option>
                  <option>Client</option>
                  <option>Vendor</option>
                </select>
              </div>

              {/* Reference Number */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Reference Number</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Reference Number"
                  className="input input-bordered input-info w-full"
                  aria-label="Reference Number"
                />
              </div>

              {/* Currency */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select
                  className="select select-info w-full"
                  aria-label="Currency"
                >
                  <option value="" disabled selected>
                    Select Currency
                  </option>
                  <option>PHP</option>
                  <option>USD</option>
                  <option>YEN</option>
                </select>
              </div>

              {/* Issue Date */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Issue Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-info w-full"
                  aria-label="Issue Date"
                />
              </div>

              {/* Due Date */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Due Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-info w-full"
                  aria-label="Due Date"
                />
              </div>

              {/* Expected Payment Date */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Expected Payment Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-info w-full"
                  aria-label="Expected Payment Date"
                />
              </div>

              {/* Payment Type */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Payment Type</span>
                </label>
                <select
                  className="select select-info w-full"
                  aria-label="Payment Type"
                >
                  <option value="" disabled selected>
                    Select Payment Type
                  </option>
                  <option>GCash</option>
                  <option>Bank Transfer</option>
                  <option>Cash on Delivery</option>
                </select>
              </div>
            </div>

            {/* Display */}
            <div className=" flex my-10 gap-5">
              {/* Bill To Section */}
              <div>
                <h2 className="text-xl font-semibold">Bill To:</h2>
                <div className="flex flex-col mt-2">
                  <p className="font-medium">Customer Name: John Doe</p>
                  <p>Company Name: ABC Corporation</p>
                  <p>Address: 123 Main St, City, Country</p>
                  <p>Phone: (123) 456-7890</p>
                  <p>Email: johndoe@example.com</p>
                </div>
              </div>

              {/* Ship To Section */}
              <div>
                <h2 className="text-xl font-semibold">Ship To:</h2>
                <div className="flex flex-col mt-2">
                  <p className="font-medium">Customer Name: Jane Smith</p>
                  <p>Company Name: XYZ Ltd.</p>
                  <p>Address: 456 Elm St, City, Country</p>
                  <p>Phone: (987) 654-3210</p>
                  <p>Email: janesmith@example.com</p>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="mt-5">
              <h2 className="text-lg font-medium">Purchase Order Details</h2>
              <table className="table w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th>Non-PO</th>
                    <th>PO Number</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Unit Amount (IDR)</th>
                    <th>Discount (%)</th>
                    <th>Taxes (%)</th>
                    <th>Total Amount (IDR)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Example Row 1 */}
                  {/* Add more rows as needed */}
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        aria-label="Non-PO"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input w-full"
                        aria-label="PO Number"
                        value="PO-12345"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input w-full"
                        aria-label="Item Name"
                        value="Office Supplies"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Quantity"
                        value="10"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Unit Amount (IDR)"
                        value="1000"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Discount"
                        value="10"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Taxes"
                        value="5"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Total Amount (IDR)"
                        value="9500"
                        readOnly
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-info"
                        aria-label="Non-PO"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input w-full"
                        aria-label="PO Number"
                        value="PO-12346"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="input w-full"
                        aria-label="Item Name"
                        value="Printer Ink"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Quantity"
                        value="5"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Unit Amount (IDR)"
                        value="2000"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Discount"
                        value="5"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Taxes"
                        value="10"
                        readOnly
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="input w-full"
                        aria-label="Total Amount (IDR)"
                        value="9500"
                        readOnly
                      />
                    </td>
                  </tr>

                  {/* More rows can be added dynamically */}
                </tbody>
              </table>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-medium text-medium text-black/60"
            aria-label="TIMELINE"
            defaultChecked
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 2
          </div>

          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-medium text-medium text-black/60"
            aria-label="PAYMENT"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 3
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-medium text-medium text-black/60"
            aria-label="CREDIT"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 4
          </div>
          <input
            type="radio"
            name="my_tabs_1"
            role="tab"
            className="tab font-medium text-medium text-black/60"
            aria-label="FILES"
          />
          <div role="tabpanel" className="tab-content p-10">
            Tab content 5
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceVendor;

import axios from "axios";
import { IoMdCopy } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateInvoiceVendor = () => {
  const { orderId } = useParams();
  const { token } = verifyStore();

  const [purchaseData, setPurchaseData] = useState();
  useEffect(() => {
    fetchOrderId();
  }, []);
  console.log(purchaseData);

  const fetchOrderId = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/invoices/${orderId}`, {
        headers: { token: token },
      });
      setPurchaseData(response.data.singleInvoice);

      toast.success(response.data.success);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white w-full h-auto p-5">
      {/* Top */}
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-2xl font-medium">
            Invoice #{purchaseData?.purchaseOrderNumber}{" "}
          </p>
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
            <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-5">
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
                  <option value={purchaseData?.supplier?.supplierName} selected>
                    {purchaseData?.supplier?.supplierName}
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
                  value={purchaseData?.purchaseOrderNumber}
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
                  <option value="PHP" selected>
                    PHP
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
                  value={purchaseData?.orderDate?.split("T")[0]}
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
                  value={purchaseData?.createdAt?.split("T")[0]}
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
                  aria-label="Due Date"
                  value={
                    purchaseData?.paymentTerm === "Net 30"
                      ? new Date(
                          new Date(purchaseData?.orderDate).setDate(
                            new Date(purchaseData?.orderDate).getDate() + 30
                          )
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  readOnly
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
                  <option selected value={purchaseData?.paymentType}>
                    {purchaseData?.paymentType}
                  </option>
                  <option value="GCash">GCash</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
              </div>
            </div>

            {/* Display */}
            <div className="flex flex-col my-5 md:flex-row md:my-7 md:gap-5">
              {/* Bill To Section */}
              <div className="flex-1 mb-5 md:mb-0">
                <h2 className="text-xl font-semibold">Bill To:</h2>
                <div className="flex flex-col mt-2 text-sm">
                  <p className="font-medium">
                    Customer Name: {purchaseData?.supplier.firstName}{" "}
                    {purchaseData?.supplier.lastName}
                  </p>
                  <p>Company Name: {purchaseData?.supplier.supplierName}</p>
                  <p>
                    Address: {purchaseData?.supplier?.address?.street},{" "}
                    {purchaseData?.supplier?.address?.city},{" "}
                    {purchaseData?.supplier?.address?.state},{" "}
                    {purchaseData?.supplier?.address?.country},{" "}
                    {purchaseData?.supplier?.address?.zipCode}
                  </p>{" "}
                  <p>
                    Phone:{" "}
                    {purchaseData?.supplier?.contactPhone ||
                      "Your Company Phone"}
                  </p>
                  <p>
                    Email:{" "}
                    {purchaseData?.supplier?.contactEmail ||
                      "Your Company Email"}
                  </p>
                </div>
              </div>

              {/* Ship To Section */}
              <div className="flex-1">
                <h2 className="text-xl font-semibold">Ship To:</h2>
                <div className="flex flex-col mt-2 text-sm">
                  <p className="font-medium">
                    Customer Name: {purchaseData?.supplier.firstName}{" "}
                    {purchaseData?.supplier.lastName}
                  </p>
                  <p>Company Name: {purchaseData?.supplier.supplierName}</p>
                  <p>
                    Address: {purchaseData?.supplier?.address?.street},{" "}
                    {purchaseData?.supplier?.address?.city},{" "}
                    {purchaseData?.supplier?.address?.state},{" "}
                    {purchaseData?.supplier?.address?.country},{" "}
                    {purchaseData?.supplier?.address?.zipCode}
                  </p>{" "}
                  <p>
                    Phone:{" "}
                    {purchaseData?.supplier?.contactPhone ||
                      "Your Company Phone"}
                  </p>
                  <p>
                    Email:{" "}
                    {purchaseData?.supplier?.contactEmail ||
                      "Your Company Email"}
                  </p>
                </div>
              </div>
            </div>

            {/* Table */}
            {/* Purchase Order Details */}
            <div className="mt-5 overflow-x-auto">
              <h2 className="text-lg font-medium">Purchase Order Details</h2>
              <table className="table w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-xs">Non-PO</th>
                    <th className="p-2 text-xs">PO Number</th>
                    <th className="p-2 text-xs">Name</th>
                    <th className="p-2 text-xs">Quantity</th>
                    <th className="p-2 text-xs">Unit Amount (PHP)</th>
                    <th className="p-2 text-xs">Discount (%)</th>
                    <th className="p-2 text-xs">Taxes (%)</th>
                    <th className="p-2 text-xs">Total Amount (PHP)</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseData?.items?.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          className="checkbox checkbox-info"
                          aria-label="Non-PO"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="input w-full"
                          aria-label="PO Number"
                          value={purchaseData?.purchaseOrderNumber}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          className="input w-full"
                          aria-label="Item Name"
                          value={item?.name}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="input w-full"
                          aria-label="Quantity"
                          value={item?.quantity}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="input w-full"
                          aria-label="Unit Amount (PHP)"
                          value={item?.price}
                          readOnly
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="input w-full"
                          aria-label="Discount"
                          defaultValue={item?.discount || 0}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="input w-full"
                          aria-label="Taxes"
                          defaultValue={purchaseData?.tax || 0}
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          className="input w-full"
                          aria-label="Total Amount (PHP)"
                          value={item?.totalPrice}
                          readOnly
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="max-w-sm my-3 p-6 bg-gray-100 rounded-lg border border-gray-300 ">
              <div>
                <div className="flex justify-between py-2">
                  <span>Subtotal, IDR</span>
                  <span>380,00,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Taxes</span>
                  <a
                    href="#"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    + TAX
                  </a>
                </div>
                <div className="flex justify-between py-2">
                  <span>Discount</span>
                  <a
                    href="#"
                    className="text-blue-600 font-bold hover:underline"
                  >
                    + DISCOUNT
                  </a>
                </div>
                <div className="flex justify-between py-2">
                  <span>Total, IDR</span>
                  <span>380,00,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Amount Paid, IDR</span>
                  <span>--</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Balance Due, IDR</span>
                  <span>380,00,000</span>
                </div>
              </div>
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

import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoMdCopy } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { apiURL } from "../context/verifyStore";
import verifyStore from "../context/verifyStore";

const CreateInvoiceVendor = () => {
  const { orderId } = useParams();
  const { token } = verifyStore();
  const [purchaseData, setPurchaseData] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  // USEFORM LOGIC
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {},
  });

  // USEEFFECT

  const onSubmit = async (data) => {
    
    console.log(data);
    try {
      const response = await axios.post(`${apiURL}/api/invoices/create`, data, {
        headers: { token: token },
      });
      toast.success(response.data.message);
      navigate("/ordersvendor/ReceivingOrdersVendor");
    } catch (error) {
      toast.error(error?.response.data.message);
    }
    // const response = await
  };

  const fetchOrderId = async () => {
    setLoading(true);

    try {
      const response = await axios.get(`${apiURL}/api/invoices/${orderId}`, {
        headers: { token: token },
      });
      setPurchaseData(response.data.singleInvoice);

      toast.success(response.data.success);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOrderId();
  }, [orderId]); // Removed reset and purchaseData to avoid unwanted calls

  useEffect(() => {
    if (purchaseData) {
      reset(purchaseData); // Reset form with fetched data
    }
  }, [purchaseData, reset]);

  console.log(purchaseData);

  return (
    <div className="bg-white w-full h-auto p-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Top */}
        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <p className="text-2xl font-medium">
              Invoice #{purchaseData?.purchaseOrderNumber}
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
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 hover:bg-green-500 duration-150 rounded-lg text-white"
            >
              Send For Approvalsss
            </button>
            <NavLink to="/ordersvendor/ReceivingOrdersVendor">
              <IoClose className="size-6 cursor-pointer" />
            </NavLink>
          </div>
        </div>

        {/* TAB */}
        <div className="mt-5">
          {/* TAB 1 */}
          <div className=" py-5">
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
                  {...register("companyName", {
                    required: "Customer is required",
                  })}
                >
                  <option value="" disabled selected>
                    Select Customer
                  </option>
                  <option
                    value={purchaseData?.companyAccount?.companyName}
                    selected
                  >
                    {purchaseData?.companyAccount?.companyName}
                  </option>
                  <option>Supplier</option>
                  <option>Client</option>
                  <option>Vendor</option>
                </select>
                {errors.customerType && (
                  <span className="text-red-500 text-sm">
                    {errors.customerType.message}
                  </span>
                )}
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
                  {...register("referenceNumber", {
                    required: "Reference Number is required",
                  })}
                />
                {errors.referenceNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.referenceNumber.message}
                  </span>
                )}
              </div>

              {/* Currency */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Currency</span>
                </label>
                <select
                  className="select select-info w-full"
                  aria-label="Currency"
                  {...register("currency", {
                    required: "Currency is required",
                  })}
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
                {errors.referenceNumber && (
                  <span className="text-red-500 text-sm">
                    {errors.referenceNumber.message}
                  </span>
                )}
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
                  {...register("issueDate", {
                    required: "Orderdate is required",
                  })}
                />
                {errors.issueDate && (
                  <span className="text-red-500 text-sm">
                    {errors.issueDate.message}
                  </span>
                )}
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
                  {...register("dueDate", {
                    required: "Due Date is required",
                  })}
                />
                {errors.dueDate && (
                  <span className="text-red-500 text-sm">
                    {errors.dueDate.message}
                  </span>
                )}
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
                    purchaseData?.paymentTerm === "Net 30" &&
                    purchaseData?.orderDate
                      ? new Date(
                          new Date(purchaseData?.orderDate).setDate(
                            new Date(purchaseData?.orderDate).getDate() + 30
                          )
                        )
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  {...register("expectedPaymentDate", {
                    required: "Expected Payment Date is required",
                  })}
                />
                {errors.expectedPaymentDate && (
                  <span className="text-red-500 text-sm">
                    {errors.expectedPaymentDate.message}
                  </span>
                )}
              </div>

              {/* Payment Type */}
              <div className="flex-1 max-w-xs">
                <label className="label">
                  <span className="label-text">Payment Type</span>
                </label>
                <select
                  className="select select-info w-full"
                  aria-label="Payment Type"
                  {...register("paymentType", {
                    required: "Payment Type is required",
                  })}
                  defaultValue={purchaseData?.paymentDetails?.paymentMethod}
                >
                  <option disabled value="">
                    Select Payment Type
                  </option>
                  <option
                    selected
                    value={
                      purchaseData?.paymentDetails?.paymentMethod
                        ? purchaseData?.paymentDetails?.paymentMethod
                        : "N/A"
                    }
                  >
                    {purchaseData?.paymentDetails?.paymentMethod
                      ? purchaseData?.paymentDetails?.paymentMethod
                      : "N/A"}
                  </option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="GCash">GCash</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                </select>
                {errors.paymentType && (
                  <span className="text-red-500 text-sm">
                    {errors.paymentType.message}
                  </span>
                )}
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
                  <p>
                    Company Name: {purchaseData?.companyAccount?.companyName}
                  </p>
                  <p>
                    Address: {purchaseData?.companyAccount?.companyAddress},
                    {purchaseData?.companyAccount?.state},
                    {purchaseData?.companyAccount?.country},
                    {purchaseData?.companyAccount?.zipCode}
                  </p>
                  <p>
                    Phone:{" "}
                    {purchaseData?.companyAccount?.companyPhone ||
                      "Your Company Phone"}
                  </p>
                  <p>
                    Email:{" "}
                    {purchaseData?.companyAccount?.companyEmail ||
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
                  <p>
                    Company Name: {purchaseData?.companyAccount?.companyName}
                  </p>
                  <p>
                    Address: {purchaseData?.companyAccount?.companyAddress},
                    {purchaseData?.companyAccount?.state},
                    {purchaseData?.companyAccount?.country},
                    {purchaseData?.companyAccount?.zipCode}
                  </p>
                  <p>
                    Phone:{" "}
                    {purchaseData?.companyAccount?.companyPhone ||
                      "Your Company Phone"}
                  </p>
                  <p>
                    Email:{" "}
                    {purchaseData?.companyAccount?.companyEmail ||
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

            {/* Space thissss */}

            {/* end */}
          </div>
        </div>

        <div className="py-4 mb-4 shadow-md border border-collapse px-4 min-w-40 max-w-40">
          <h1 className="font-semibold">
            Total: <strong>{watch("totalAmount")}</strong>
          </h1>
        </div>

        <button
          type="submit" // Make sure the type is set to submit
          className="btn btn-primary"
        >
          Click to Save
        </button>
      </form>
    </div>
  );
};

export default CreateInvoiceVendor;

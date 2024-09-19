import React, { useState } from "react";
import { DatePicker } from "@nextui-org/date-picker";

const CreatePurchaseOrder = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    orderNumber: "",
    supplierName: "",
    contactDetails: "",
    supplierAddress: "",
    orderDate: null,
  });

  // Check if all fields are completed
  const isFormComplete = () => {
    return (
      formData.orderNumber &&
      formData.supplierName &&
      formData.contactDetails &&
      formData.supplierAddress &&
      formData.orderDate
    );
  };

  // Handler to reset form fields with confirmation
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setFormData({
        orderNumber: "",
        supplierName: "",
        contactDetails: "",
        supplierAddress: "",
        orderDate: null,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Section with Save, Cancel, and Reset */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#07074D]">Create Purchase Order</h1>
        <div className="space-x-3">
          <button
            className="rounded-md bg-red-500 text-white py-2 px-6 text-sm font-medium hover:bg-red-600 transition"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-yellow-500 text-white py-2 px-6 text-sm font-medium hover:bg-yellow-600 transition"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className={`rounded-md bg-green-500 text-white py-2 px-6 text-sm font-medium transition ${
              isFormComplete()
                ? "hover:bg-green-600"
                : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isFormComplete()}
          >
            Save
          </button>
        </div>
      </div>

      {/* Order Number and Date */}
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="w-full sm:w-1/2">
          <label
            htmlFor="orderNumber"
            className="mb-2 block text-base font-medium text-[#07074D]"
          >
            Order Number
          </label>
          <input
            type="text"
            id="orderNumber"
            placeholder="Enter order number"
            aria-required="true"
            value={formData.orderNumber}
            onChange={(e) =>
              setFormData({ ...formData, orderNumber: e.target.value })
            }
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        <div className="w-full sm:w-1/2">
          <label
            htmlFor="date"
            className="mb-2 block text-base font-medium text-[#07074D]"
          >
            Date
          </label>
          <DatePicker
            label=""
            placeholder="Select a date"
            value={formData.orderDate}
            onChange={(date) => setFormData({ ...formData, orderDate: date })}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
      </div>

      {/* Supplier Information */}
      <div>
        <label
          htmlFor="supplierInfo"
          className="mb-2 block text-base font-medium text-[#07074D]"
        >
          Supplier Information
        </label>

        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Supplier Name"
            aria-required="true"
            value={formData.supplierName}
            onChange={(e) =>
              setFormData({ ...formData, supplierName: e.target.value })
            }
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />

          <input
            type="text"
            placeholder="Contact Details"
            aria-required="true"
            value={formData.contactDetails}
            onChange={(e) =>
              setFormData({ ...formData, contactDetails: e.target.value })
            }
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />

          <textarea
            placeholder="Supplier Address"
            aria-required="true"
            value={formData.supplierAddress}
            onChange={(e) =>
              setFormData({ ...formData, supplierAddress: e.target.value })
            }
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none h-24"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;

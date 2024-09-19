import React from "react";
import { DatePicker } from "@nextui-org/date-picker";

const CreatePurchaseOrder = () => {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Order Number */}
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
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>

        {/* Date */}
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
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-1 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
      </div>

      {/* Supplier information */}
      <div className="mt-5">
        <label
          htmlFor="supplierInfo"
          className="mb-2 block text-base font-medium text-[#07074D]"
        >
          Supplier Information
        </label>

        {/* Supplier Name */}
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Supplier Name"
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />

          {/* Contact Details */}
          <input
            type="text"
            placeholder="Contact Details"
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />

          {/* Address */}
          <textarea
            placeholder="Supplier Address"
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md resize-none h-24"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;

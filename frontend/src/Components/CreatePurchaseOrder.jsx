import React, { useState, useEffect } from "react";
import { DatePicker } from "@nextui-org/date-picker";

const CreatePurchaseOrder = () => {
  const [formData, setFormData] = useState({
    supplier: "",
    orderDate: null,
    items: [{ name: "", quantity: 0, price: 0, discount: 0, inStock: true }],
    tax: 0,
    approvalStatus: false,
  });

  // Handler to update form fields
  const handleInputChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  // Add new item
  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: "", quantity: 0, price: 0, discount: 0, inStock: true }],
    });
  };

  // Handler to remove item
  const handleRemoveItem = (index) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: updatedItems });
  };

  // Reset the form
  const handleReset = () => {
    setFormData({
      supplier: "",
      orderDate: null,
      items: [{ name: "", quantity: 0, price: 0, discount: 0, inStock: true }],
      tax: 0,
      approvalStatus: false,
    });
  };

  // Calculate totals for each item
  const calculateItemTotal = (item) => {
    const discountAmount = (item.price * item.discount) / 100;
    return (item.price - discountAmount) * item.quantity;
  };

  // Calculate subtotal, tax, and total
  const calculateSummary = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
    const taxAmount = (subtotal * formData.tax) / 100;
    const total = subtotal + taxAmount;
    return { subtotal, taxAmount, total };
  };

  // Stock Validation (mock example, could be extended to an API call)
  const validateStock = (itemName) => {
    const stockData = { "Item A": true, "Item B": false, "Item C": true }; // Mock stock data
    return stockData[itemName] || false;
  };

  // Update stock availability based on item name
  useEffect(() => {
    const updatedItems = formData.items.map((item) => ({
      ...item,
      inStock: validateStock(item.name),
    }));
    setFormData({ ...formData, items: updatedItems });
  }, [formData.items.map((item) => item.name)]);

  const { subtotal, taxAmount, total } = calculateSummary();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-[#07074D]">Create Purchase Order</h1>
        <div className="space-x-3">
          <button className="rounded-md bg-red-500 text-white py-2 px-6 text-sm font-medium hover:bg-red-600 transition">
            Cancel
          </button>
          <button className="rounded-md bg-yellow-500 text-white py-2 px-6 text-sm font-medium hover:bg-yellow-600 transition" onClick={handleReset}>
            Reset
          </button>
          <button className="rounded-md bg-green-500 text-white py-2 px-6 text-sm font-medium hover:bg-green-600 transition">
            Save
          </button>
        </div>
      </div>

      {/* Vendor Selection */}
      <div className="mb-4">
        <label htmlFor="supplier" className="block text-base font-medium text-[#07074D]">Vendor Selection</label>
        <select
          id="supplier"
          value={formData.supplier}
          onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        >
          <option value="">Select Supplier</option>
          <option value="Supplier A">Supplier A</option>
          <option value="Supplier B">Supplier B</option>
          <option value="Supplier C">Supplier C</option>
        </select>
      </div>

      {/* Date Selection */}
      {/* NEED ENHANCE DATE */}
      {/* NEED ENHANCE DATE */}
      {/* NEED ENHANCE DATE */}
      {/* NEED ENHANCE DATE */}
      <div className="mb-4">
        <label htmlFor="date" className="block text-base font-medium text-[#07074D]">Date</label>
        <DatePicker
          placeholder="Select a date"
          value={formData.orderDate}
          onChange={(date) => setFormData({ ...formData, orderDate: date })}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      {/* Item Selection and Quantity Entry */}
      <div className="mb-6">
        <label className="block text-base font-medium text-[#07074D]">Item Selection and Quantity Entry</label>
        {formData.items.map((item, index) => (
          <div key={index} className="flex space-x-4 mb-2 items-center">
            <input
              type="text"
              placeholder="Item Name"
              value={item.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              className="w-1/3 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
              className="w-1/6 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => handleInputChange(index, "price", e.target.value)}
              className="w-1/6 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <input
              type="number"
              placeholder="Discount (%)"
              value={item.discount}
              onChange={(e) => handleInputChange(index, "discount", e.target.value)}
              className="w-1/6 rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <span className={`text-sm font-medium ${item.inStock ? "text-green-500" : "text-red-500"}`}>
              {item.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <button
              onClick={() => handleRemoveItem(index)}
              className="rounded-md bg-red-500 text-white px-4 py-2 text-sm font-medium hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          onClick={handleAddItem}
          className="mt-2 rounded-md bg-blue-500 text-white px-6 py-2 text-sm font-medium hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </div>

      {/* Tax Input */}
      <div className="mb-4">
        <label htmlFor="tax" className="block text-base font-medium text-[#07074D]">Tax (%)</label>
        <input
          type="number"
          id="tax"
          value={formData.tax}
          onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      {/* Approval Workflow */}
      <div className="mb-4">
        <label className="block text-base font-medium text-[#07074D]">Approval Workflow</label>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="approvalStatus"
            checked={formData.approvalStatus}
            onChange={(e) => setFormData({ ...formData, approvalStatus: e.target.checked })}
          />
          <label htmlFor="approvalStatus" className="text-base text-[#6B7280]">Mark for Approval</label>
        </div>
      </div>

      {/* Purchase Order Summary */}
      <div className="border-t border-gray-300 pt-4 mt-6">
        <h2 className="text-lg font-semibold text-[#07074D]">Order Summary</h2>
        <p className="text-base text-[#6B7280]">Subtotal: ${subtotal.toFixed(2)}</p>
        <p className="text-base text-[#6B7280]">Tax: ${taxAmount.toFixed(2)}</p>
        <p className="text-base text-[#07074D] font-bold">Total: ${total.toFixed(2)}</p>
      </div>

      {/* Document Generation */}
      <div className="mb-6">
        <button className="rounded-md bg-purple-500 text-white py-2 px-6 text-sm font-medium hover:bg-purple-600 transition">
          Generate PDF
        </button>
      </div>
    </div>
  );
};

export default CreatePurchaseOrder;

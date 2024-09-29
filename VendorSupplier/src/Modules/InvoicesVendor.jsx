import React, { useState } from 'react';

const InvoicesVendor = () => {
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Invoice Management</h1>

      {/* Invoice Dashboard */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Total Invoices</div>
            <div className="stat-value text-3xl text-gray-800">150</div>
            <div className="stat-desc text-gray-500">Invoices Generated</div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Pending Payment</div>
            <div className="stat-value text-3xl text-blue-500">75</div>
            <div className="stat-desc text-gray-500">Invoices Pending Payment</div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Paid Invoices</div>
            <div className="stat-value text-3xl text-green-500">75</div>
            <div className="stat-desc text-gray-500">Invoices Paid</div>
          </div>
        </div>
      </div>

      {/* Create Invoice */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Invoice</h2>
        <form className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Vendor</span>
            </label>
            <select className="select select-bordered w-full bg-gray-50">
              <option>Select Vendor</option>
              <option>Vendor A</option>
              <option>Vendor B</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Invoice Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-gray-50"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Due Date</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full bg-gray-50"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/70 font-medium">Invoice Amount</span>
            </label>
            <input type="number" className="input input-bordered w-full bg-gray-50" placeholder="Enter Amount" />
          </div>

          <button className="btn btn-primary mt-4 w-full">Create Invoice</button>
        </form>
      </div>

      {/* Invoice Alerts */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Alerts</h2>
        <div className="alert alert-warning shadow-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <span>Overdue Invoice: Invoice #54321 is overdue by 5 days.</span>
        </div>
      </div>

      {/* Invoice Reports */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Invoice Reports</h2>
        <button className="btn btn-outline btn-success w-full">Generate Invoice Report</button>
      </div>
    </div>
  );
};

export default InvoicesVendor;

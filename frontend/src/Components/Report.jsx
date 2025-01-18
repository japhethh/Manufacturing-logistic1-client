import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { NavLink } from "react-router-dom";

const Report = () => {
  useEffect(() => {
    // Initialize DataTable only once
    if (!$.fn.DataTable.isDataTable("#reportTable")) {
      $("#reportTable").DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        lengthChange: false,
        language: {
          emptyTable: "No reports available",
        },
      });
    }
  }, []);

  // Mock data for the report
  const summary = {
    totalOrders: 120,
    dispatchedOrders: 85,
    pendingOrders: 35,
    deliverySuccessRate: "91%",
  };

  const reportDetails = [
    {
      orderId: "001",
      customer: "ABC Corp",
      status: "Delivered",
      deliveryDate: "2024-11-01",
      success: true,
    },
    {
      orderId: "002",
      customer: "XYZ Ltd",
      status: "In Transit",
      deliveryDate: "2024-11-03",
      success: false,
    },
    {
      orderId: "003",
      customer: "DEF Inc",
      status: "Pending",
      deliveryDate: "2024-11-05",
      success: false,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* BREADCRUMBS */}
      <div className="breadcrumbs text-sm mb-6">
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/warehouse" className="text-blue-600 hover:underline">
              Warehouse
            </NavLink>
          </li>
          <li>
            <span>Reporting & Analytics</span>
          </li>
        </ul>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Monthly Report Summary
      </h1>

      {/* Summary Stats */}
      <div className="grid gap-6 mb-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Total Orders</h2>
          <p className="text-3xl font-bold text-gray-900">{summary.totalOrders}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Dispatched Orders</h2>
          <p className="text-3xl font-bold text-gray-900">{summary.dispatchedOrders}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Pending Orders</h2>
          <p className="text-3xl font-bold text-gray-900">{summary.pendingOrders}</p>
        </div>

        <div className="p-6 bg-white shadow-lg rounded-lg text-center border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">Delivery Success Rate</h2>
          <p className="text-3xl font-bold text-gray-900">{summary.deliverySuccessRate}</p>
        </div>
      </div>

      {/* Detailed Report */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Detailed Report
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table
          id="reportTable"
          className="table-auto w-full text-sm text-gray-700 border-collapse"
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Delivery Date</th>
              <th className="px-6 py-3 text-left">Success</th>
            </tr>
          </thead>
          <tbody>
            {reportDetails.map((report) => (
              <tr
                key={report.orderId}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="px-6 py-3">{report.orderId}</td>
                <td className="px-6 py-3">{report.customer}</td>
                <td className="px-6 py-3">{report.status}</td>
                <td className="px-6 py-3">{report.deliveryDate}</td>
                <td className="px-6 py-3">
                  {report.success ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;

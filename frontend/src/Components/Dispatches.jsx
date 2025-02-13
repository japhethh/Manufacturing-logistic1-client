import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { NavLink } from "react-router-dom";

const Dispatches = () => {
  useEffect(() => {
    // Initialize DataTable only once
    if (!$.fn.DataTable.isDataTable("#dispatchTable")) {
      $("#dispatchTable").DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        lengthChange: false,
        language: {
          emptyTable: "No dispatches available",
        },
      });
    }
  }, []);

  const dispatches = [
    {
      dispatchId: "D001",
      orderId: "001",
      vehicle: "Truck A - ABC1234",
      driver: "John Doe",
      status: "In Transit",
      dispatchDate: "2024-11-01 08:30",
      estimatedArrival: "2024-11-02 14:00",
    },
    {
      dispatchId: "D002",
      orderId: "002",
      vehicle: "Van B - XYZ5678",
      driver: "Jane Smith",
      status: "Delivered",
      dispatchDate: "2024-11-01 09:00",
      estimatedArrival: "2024-11-02 15:30",
    },
    {
      dispatchId: "D003",
      orderId: "003",
      vehicle: "Truck C - LMN4321",
      driver: "Bob Lee",
      status: "Dispatched",
      dispatchDate: "2024-11-01 10:15",
      estimatedArrival: "2024-11-02 17:00",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* BREADCRUMBS */}
      <div className="breadcrumbs text-sm mb-6">
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/warehouse" className="text-blue-600 font-Roboto">
              Warehouse
            </NavLink>
          </li>
          <li>
            <span className="font-Roboto">Shipping & Dispatch</span>
          </li>
        </ul>
      </div>

      <h1 className="text-3xl font-semibold text-gray-800 font-Roboto mb-6 text-center">
        Dispatches Overview
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table
          id="dispatchTable"
          className="table-auto w-full text-sm text-gray-700 font-Roboto border-collapse"
        >
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Dispatch ID</th>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Vehicle</th>
              <th className="px-4 py-2 text-left">Driver</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Dispatch Date</th>
              <th className="px-4 py-2 text-left">Estimated Arrival</th>
            </tr>
          </thead>
          <tbody>
            {dispatches.map((dispatch) => (
              <tr
                key={dispatch.dispatchId}
                className="border-b hover:bg-gray-100 transition-all"
              >
                <td className="px-4 py-2">{dispatch.dispatchId}</td>
                <td className="px-4 py-2">{dispatch.orderId}</td>
                <td className="px-4 py-2">{dispatch.vehicle}</td>
                <td className="px-4 py-2">{dispatch.driver}</td>
                <td className="px-4 py-2">{dispatch.status}</td>
                <td className="px-4 py-2">{dispatch.dispatchDate}</td>
                <td className="px-4 py-2">{dispatch.estimatedArrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dispatches;

import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { NavLink } from "react-router-dom";

const FulFillOrders = () => {
  useEffect(() => {
    // Ensure DataTable is only initialized once
    if (!$.fn.DataTable.isDataTable("#orderTable")) {
      $("#orderTable").DataTable({
        responsive: true,
        paging: true,
        searching: true,
        ordering: true,
        lengthChange: false,
      });
    }
  }, []);  

  const orders = [
    {
      id: "001",
      customer: "ABC Corp",
      product: "Product A",
      status: "Processing",
      deliveryDate: "2024-11-01",
    },
    {
      id: "002",
      customer: "XYZ Ltd",
      product: "Product B",
      status: "Shipped",
      deliveryDate: "2024-11-03",
    },
    {
      id: "003",
      customer: "DEF Inc",
      product: "Product C",
      status: "Quality Control",
      deliveryDate: "2024-11-05",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs text-sm mb-4">
        <ul className="flex space-x-2">
          <li>
            <NavLink to="/warehouse" className="text-blue-600 hover:underline">
              Warehouse Management
            </NavLink>
          </li>
          <li className="text-gray-500">/</li>
          <li className="text-gray-700">Order Fulfillment</li>
        </ul>
      </nav>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Order Fulfillment
      </h1>

      {/* Process Overview */}
      <div className="grid gap-6 md:grid-cols-3 mb-8">
        {[
          {
            title: "Order Placement",
            description:
              "Order details are submitted by customers and logged into the system.",
          },
          {
            title: "Order Processing",
            description:
              "Inventory levels are checked, and orders are prepared for fulfillment.",
          },
          {
            title: "Manufacturing & Assembly",
            description:
              "Items are produced and assembled as necessary to meet customer requirements.",
          },
          {
            title: "Quality Control",
            description:
              "Products undergo rigorous quality checks before packaging.",
          },
          {
            title: "Warehouse & Packing",
            description:
              "Orders are packed and labeled in the warehouse, ready for shipment.",
          },
          {
            title: "Shipping & Delivery",
            description:
              "Orders are dispatched and delivered to customers with tracking updates.",
          },
        ].map((step, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="font-semibold text-lg mb-2 text-gray-800">
              {step.title}
            </h2>
            <p className="text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Order Status Table */}
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Order Status Overview
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
        <table id="orderTable" className="table-auto w-full text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer}</td>
                <td className="border px-4 py-2">{order.product}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FulFillOrders;

import React, { useEffect } from "react";
import $ from "jquery";
import "datatables.net-dt";
import { NavLink } from "react-router-dom";

const FulFillOrders = () => {
  useEffect(() => {
    // Initialize DataTable after component mounts
    $(document).ready(function () {
      $("#orderTable").DataTable();
    });
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
    <div className="p-6 bg-base-200 min-h-screen">
      {/* BREADCRUMBS */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <NavLink to="/warehouse">
              <a>Warehouse Management</a>
            </NavLink>
          </li>
          <li>
            <a>Order Fulfillment</a>
          </li>
        </ul>
      </div>
      <h1 className="text-2xl font-bold mb-6 text-center">Order Fulfillment</h1>

      <div className="grid gap-6 md:grid-cols-3 mb-6">
        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Order Placement</h2>
          <p className="text-sm">
            Order details are submitted by customers and logged into the system.
          </p>
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Order Processing</h2>
          <p className="text-sm">
            Inventory levels are checked, and orders are prepared for
            fulfillment.
          </p>
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">
            Manufacturing & Assembly
          </h2>
          <p className="text-sm">
            Items are produced and assembled as necessary to meet customer
            requirements.
          </p>
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Quality Control</h2>
          <p className="text-sm">
            Products undergo rigorous quality checks before packaging.
          </p>
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Warehouse & Packing</h2>
          <p className="text-sm">
            Orders are packed and labeled in the warehouse, ready for shipment.
          </p>
        </div>

        <div className="bg-base-100 p-4 shadow-md rounded-lg">
          <h2 className="font-semibold text-lg mb-2">Shipping & Delivery</h2>
          <p className="text-sm">
            Orders are dispatched and delivered to customers with tracking
            updates.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">
        Order Status Overview
      </h2>
      <div className="overflow-x-auto">
        <table id="orderTable" className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.product}</td>
                <td>{order.status}</td>
                <td>{order.deliveryDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FulFillOrders;

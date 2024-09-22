import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserCheck,
  FaUserPlus,
  FaClipboardCheck,
  FaComments,
  FaShippingFast,
  FaFileInvoiceDollar,
  FaUserCog,
  FaChartLine,
  FaFileContract,
} from "react-icons/fa";

const SidebarVendor = () => {
  return (
    <div className="bg-white shadow-md h-screen w-80">
      <nav className="p-6">
        <NavLink to="/dashboardvendor">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8">
            Vendor Management
          </h2>
        </NavLink>
        <ul className="space-y-4">
          {[
            {
              icon: <FaUserCheck className="mr-3 text-gray-600" />,
              label: "Vendor Registration & Compliance",
              href: "#vendor-registration",
            },
            {
              icon: <FaUserPlus className="mr-3 text-gray-600" />,
              label: "Supplier Onboarding",
              href: "#supplier-onboarding",
            },
            {
              icon: <FaClipboardCheck className="mr-3 text-gray-600" />,
              label: "Purchase Order Management",
              href: "#purchase-orders",
            },
            {
              icon: <FaComments className="mr-3 text-gray-600" />,
              label: "Supplier Communication",
              href: "#supplier-communication",
            },
            {
              icon: <FaShippingFast className="mr-3 text-gray-600" />,
              label: "Inventory & Shipment Tracking",
              href: "#shipment-tracking",
            },
            {
              icon: <FaFileInvoiceDollar className="mr-3 text-gray-600" />,
              label: "Payment & Invoicing",
              href: "#payment-invoicing",
            },
            {
              icon: <FaUserCog className="mr-3 text-gray-600" />,
              label: "Vendor Self-Service Portal",
              href: "#self-service",
            },
            {
              icon: <FaChartLine className="mr-3 text-gray-600" />,
              label: "Supplier Performance Monitoring",
              href: "#performance-monitoring",
            },
            {
              icon: <FaFileContract className="mr-3 text-gray-600" />,
              label: "Basic Contract Management",
              href: "#contract-management",
            },
          ].map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-200 px-4 py-2 rounded-md transition-colors flex items-center"
            >
              {item.icon}
              <a
                href={item.href}
                className="text-gray-800 block hover:text-blue-700 duration-200"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarVendor;

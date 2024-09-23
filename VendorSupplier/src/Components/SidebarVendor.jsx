import React from "react";
import vendor from "../assets/vendor.png";
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
  const menuItems = [
    {
      icon: <FaUserCheck className="mr-3 text-gray-600 size-6" />,
      label: "Vendor Registration & Compliance",
      href: "#vendor-registration",
    },
    {
      icon: <FaUserPlus className="mr-3 text-gray-600 size-6" />,
      label: "Supplier Onboarding",
      href: "#supplier-onboarding",
    },
    {
      icon: <FaClipboardCheck className="mr-3 text-gray-600 size-6" />,
      label: "Purchase Order Management",
      href: "#purchase-orders",
    },
    {
      icon: <FaComments className="mr-3 text-gray-600 size-6" />,
      label: "Supplier Communication",
      href: "#supplier-communication",
    },
    {
      icon: <FaShippingFast className="mr-3 text-gray-600 size-6" />,
      label: "Inventory & Shipment Tracking",
      href: "#shipment-tracking",
    },
    {
      icon: <FaFileInvoiceDollar className="mr-3 text-gray-600 size-6" />,
      label: "Payment & Invoicing",
      href: "#payment-invoicing",
    },
    {
      icon: <FaUserCog className="mr-3 text-gray-600 size-6" />,
      label: "Vendor Self-Service Portal",
      href: "#self-service",
    },
    {
      icon: <FaChartLine className="mr-3 text-gray-600 size-6" />,
      label: "Supplier Performance Monitoring",
      href: "#performance-monitoring",
    },
    {
      icon: <FaFileContract className="mr-3 text-gray-600 size-6" />,
      label: "Basic Contract Management",
      href: "#contract-management",
    },
  ];

  return (
    <div className="bg-white shadow-md h-screen w-80 sticky top-0 overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-visible">
      <nav className="p-6">
        <NavLink to="/dashboardvendor" className="flex items-center gap-2 mb-8">
          <img src={vendor} alt="Vendor Management Logo" className="w-16 h-16" />
          <h2 className="text-2xl font-semibold text-gray-800">Vendor Management</h2>
        </NavLink>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:bg-gray-200 rounded-md transition-colors">
              <a
                href={item.href}
                className="flex items-center px-4 py-2 text-gray-800 font-semibold hover:text-blue-700 duration-200"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarVendor;

import React from "react";
import vendor from "../assets/vendor.png";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShippingFast,
  FaFileInvoice,
  FaComments,
  FaUserCog,
} from "react-icons/fa";

const SidebarVendor = () => {
  const menuItems = [
    {
      icon: <FaTachometerAlt className="mr-3 text-gray-600 size-6" />,
      label: "Dashboard",
      to: "/dashboardvendor",
    },
    {
      icon: <FaBoxOpen className="mr-3 text-gray-600 size-6" />,
      label: "Orders",
      to: "/ordersvendor",
    },
    {
      icon: <FaWarehouse className="mr-3 text-gray-600 size-6" />,
      label: "Inventory Management",
      to: "/inventory-management",
    },
    {
      icon: <FaShippingFast className="mr-3 text-gray-600 size-6" />,
      label: "Shipment",
      to: "/shipment",
    },
    {
      icon: <FaFileInvoice className="mr-3 text-gray-600 size-6" />,
      label: "Invoices",
      to: "/invoices",
    },
    {
      icon: <FaComments className="mr-3 text-gray-600 size-6" />,
      label: "Communication",
      to: "/communication",
    },
    {
      icon: <FaUserCog className="mr-3 text-gray-600 size-6" />,
      label: "Account Management",
      to: "/account-management",
    },
  ];

  return (
    <div className="bg-white lg:flex md:flex hidden shadow-md h-screen w-80 sticky top-0 overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-visible">
      <nav className="p-6">
        <NavLink to="/dashboardvendor" className="flex items-center gap-2 mb-8">
          <img
            src={vendor}
            alt="Vendor Management Logo"
            className="w-16 h-16"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Vendor Management
          </h2>
        </NavLink>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="hover:bg-gray-200 rounded-md transition-colors"
            >
              <NavLink
                to={item.to}
                className="flex items-center px-4 py-2 text-gray-800 font-semibold hover:text-blue-700 duration-200"
                activeClassName="bg-gray-300" // Optional: for active link styling
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default SidebarVendor;

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
      href: "#dashboard",
    },
    {
      icon: <FaBoxOpen className="mr-3 text-gray-600 size-6" />,
      label: "Orders",
      href: "#orders",
    },
    {
      icon: <FaWarehouse className="mr-3 text-gray-600 size-6" />,
      label: "Inventory Management",
      href: "#inventory-management",
    },
    {
      icon: <FaShippingFast className="mr-3 text-gray-600 size-6" />,
      label: "Shipment",
      href: "#shipment",
    },
    {
      icon: <FaFileInvoice className="mr-3 text-gray-600 size-6" />,
      label: "Invoices",
      href: "#invoices",
    },
    {
      icon: <FaComments className="mr-3 text-gray-600 size-6" />,
      label: "Communication",
      href: "#communication",
    },
    {
      icon: <FaUserCog className="mr-3 text-gray-600 size-6" />,
      label: "Account Management",
      href: "#account-management",
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

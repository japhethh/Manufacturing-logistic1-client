import React, { useState } from "react";
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
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const SidebarVendor = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <FaTachometerAlt />, label: "Dashboard", to: "/dashboardvendor" },
    { icon: <FaBoxOpen />, label: "Orders", to: "/ordersvendor" },
    { icon: <FaWarehouse />, label: "Inventory Management", to: "/inventorymanagement" },
    { icon: <FaShippingFast />, label: "Shipment", to: "/shipmentvendor" },
    { icon: <FaFileInvoice />, label: "Invoices", to: "/invoicesvendor" },
    { icon: <FaComments />, label: "Communication", to: "/communicationvendor" },
    { icon: <FaUserCog />, label: "Account Management", to: "/accountmanagementvendor" },
  ];

  return (
    <div className={`bg-white shadow-md h-screen sticky top-0 transition-all duration-300 ${isCollapsed ? "w-20" : "w-80"} flex flex-col`}>
      <nav className="p-4 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <NavLink to="/dashboardvendor" className="flex items-center gap-2">
            <img src={vendor} alt="Vendor Management Logo" className="w-16 h-16" />
            {!isCollapsed && (
              <h2 className="text-2xl font-semibold text-gray-800">Vendor Management</h2>
            )}
          </NavLink>
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-blue-700">
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="hover:bg-gray-200 rounded-md transition-colors">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-gray-800 font-semibold transition duration-200 ${
                    isActive ? "bg-gray-300 text-blue-700" : "hover:text-blue-700"
                  }`
                }
                aria-label={item.label}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-2">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-auto border-t pt-4">
          <NavLink to="/profile" className="flex items-center px-4 py-2 text-gray-800 font-semibold hover:text-blue-700">
            <FaUserCog className="mr-3" />
            {!isCollapsed && <span>Profile</span>}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default SidebarVendor;

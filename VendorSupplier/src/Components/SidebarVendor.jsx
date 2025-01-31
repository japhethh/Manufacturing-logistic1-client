import { useState } from "react";
import { NavLink } from "react-router-dom";
import vendor from "../assets/vendor.png";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShippingFast,
  FaFileInvoice,
  FaComments,
  FaUserCog,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdSpatialTracking } from "react-icons/md";
import { BsClipboardCheckFill } from "react-icons/bs";
import { AiFillProduct } from "react-icons/ai";

const SidebarVendor = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    {
      icon: <FaTachometerAlt className="text-2xl" />,
      label: "Dashboard",
      to: "/dashboardvendor",
    },
    {
      icon: <FaBoxOpen className="text-2xl" />,
      label: "Orders",
      to: "/ordersvendor",
    },
    {
      icon: <AiFillProduct className="text-2xl" />,
      label: "Products",
      to: "/createproduct",
    },
    {
      icon: <BsClipboardCheckFill className="text-2xl" />,
      label: "Stock Adjustments",
      to: "/adjustments",
    },
    {
      icon: <MdSpatialTracking className="text-2xl" />,
      label: "Tracking Orders",
      to: "/trackingOrders",
    },
    {
      icon: <FaWarehouse className="text-2xl" />,
      label: "Inventory Management",
      to: "/inventorymanagement",
    },
    {
      icon: <FaShippingFast className="text-2xl" />,
      label: "Shipment",
      to: "/shipmentvendor",
    },
    {
      icon: <FaFileInvoice className="text-2xl" />,
      label: "Invoices",
      to: "/invoicesvendor",
    },
    {
      icon: <FaComments className="text-2xl" />,
      label: "Communication",
      to: "/communicationvendor",
    },
    {
      icon: <FaUserCog className="text-2xl" />,
      label: "Account Management",
      to: "/accountmanagementvendor",
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-white shadow-lg h-screen sticky top-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      } lg:flex hidden flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-4 text-gray-800 hover:text-blue-700 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
      </button>

      <nav className="p-5 flex flex-col h-full overflow-y-auto scrollbar-thin scrollbar-thumb-blue-800 scrollbar-track-gray-100">
        {/* Sidebar Header with Logo */}
        <div className="flex items-center justify-between mb-6">
          <NavLink to="/dashboardvendor" className="flex items-center gap-3">
            <img
              src={vendor}
              alt="Vendor Management Logo"
              className={`w-16 h-16 rounded-full border border-gray-300 transition-transform transform hover:scale-105 ${
                !isSidebarOpen ? "mx-auto" : ""
              }`}
            />
            {isSidebarOpen && (
              <h2 className="text-xl font-bold text-gray-800">Vendor Management</h2>
            )}
          </NavLink>
        </div>

        {/* Menu Items */}
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition duration-200 
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
                  }`
                }
                aria-label={item.label}
              >
                <span className="mr-3">{item.icon}</span>
                {isSidebarOpen && (
                  <span className="text-lg font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Profile Link at the Bottom */}
        <div className="mt-auto border-t pt-4">
          <NavLink
            to="/dashboardvendor"
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-md transition duration-200 
              ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-800 hover:bg-gray-100 hover:text-blue-700"
              }`
            }
          >
            <FaUserCog className="mr-3 text-2xl" />
            {isSidebarOpen && (
              <span className="text-lg font-medium">Profile</span>
            )}
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default SidebarVendor;
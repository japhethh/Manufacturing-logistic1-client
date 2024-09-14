import { useState } from "react";
import layout from "./Assets/layout.png";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import {
  IoFileTrayOutline,
  IoChatboxOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";
import { RiFilePaper2Line } from "react-icons/ri";
import { FiBox } from "react-icons/fi";
import { RiContactsFill } from "react-icons/ri";
import { FaWpforms } from "react-icons/fa";
import { GiTakeMyMoney } from "react-icons/gi";

import { BiPurchaseTagAlt } from "react-icons/bi";
import { MdOutlineCalculate } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";


const Sidebar = () => {
  // State to track sidebar collapse/expand status
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle sidebar state between collapsed and expanded
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`lg:flex md:flex hidden flex-col h-screen bg-white text-black px-4 py-4 border-r-2 sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-96 lg:w-96"
      }`}
      aria-label="Sidebar"
    >
      {/* Sidebar toggle button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSidebar}
          className="p-1 text-black transition duration-200 border border-gray-300 rounded-md hover:bg-gray-200 w-11"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Dashboard Logo */}
      <div
        className="flex items-center justify-center gap-2 mb-8 cursor-pointer"
        aria-label="Dashboard Logo"
      >
        <img src={layout} alt="Dashboard logo" className="w-7 h-7" />
        {!isCollapsed && <p className="text-xl font-bold">Dashboard</p>}
      </div>

      {/* Sidebar scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300">
        {/* Dashboard Link */}
        <Link to="/">
          <div
            className="flex items-center gap-2 p-2 mb-4 transition-all duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            aria-label="Dashboard"
          >
            <MdOutlineScreenshotMonitor
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "w-5 h-5"
              }`}
            />
            {!isCollapsed && (
              <p className="text-base font-semibold">Dashboard</p>
            )}
          </div>
        </Link>

        {/* Apps Section */}
        <div className="mb-2">
          <p
            className={`text-gray-500 font-semibold text-base ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Procurement
          </p>
          <ul className="w-full menu rounded-box">
            {/* Procurement Dropdown */}
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BiPurchaseTagAlt
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Purchase Requisitions
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Raw Material List</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Create Request</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BsBoxSeam
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Suppliers
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li className="mt-1">
                    <NavLink
                      to="supplierlist"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Approved Supplier List</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Performance Metrics
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <MdOutlineCalculate
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Quotation
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Request For Quotations (RFQ's)</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Compare Supplier Quotes</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <FaLuggageCart
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Purchase Orders
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Create Purchase Orders</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Track Orders</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Order Fulfillment Status</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <RiContactsFill
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Contact
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">View Contacts</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Renewals & Expirations</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <GiTakeMyMoney
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Budget Approval
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Submit For Approval</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Approval History</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
          </ul>




          {/* VENDOR */}
          <p
            className={`text-gray-500 font-semibold text-base ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Vendor
          </p>
          <ul className="w-full menu rounded-box">
            {/* Procurement Dropdown */}
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BsBoxSeam
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Raw Material Request
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Raw Material List</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Create Request</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>

            {/* Supplier Management Dropdown */}
            <li>
              <details
                open
                className={`menu-item ${isCollapsed ? "hidden" : ""}`}
              >
                <summary className="flex items-center gap-2 cursor-pointer">
                  <IoFileTrayOutline
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Suppliers
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li className="mt-1">
                    <NavLink
                      to="supplierlist"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Supplier List</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Create Suppliers
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Section */}
    </div>
  );
};

export default Sidebar;

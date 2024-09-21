import { useState, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import layout from "./Assets/layout.png";
import {
  MdOutlineScreenshotMonitor,
  MdOutlineSupportAgent,
  MdOutlineCalculate,
  MdOutlineInventory2,
  MdOutlineHandshake,
} from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { RiContactsFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoDocumentAttachOutline, IoReturnUpForward } from "react-icons/io5";
import { FaChalkboardTeacher, FaLuggageCart } from "react-icons/fa";
import { VscServerEnvironment } from "react-icons/vsc";
import { BiDollarCircle, BiPurchaseTagAlt } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { TbFileInvoice } from "react-icons/tb";
import { IoPeopleSharp } from "react-icons/io5";
import Store from "../context/Store";

const Sidebar = () => {
  // State to track sidebar collapse/expand status
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle sidebar state between collapsed and expanded
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };
  // NPM useDraggable
  const ref = useRef();
  const { events } = useDraggable(ref);

  const { userData } = Store();

  return (
    <div
      className={`lg:flex md:flex hidden flex-col h-screen bg-white text-black py-4 border-r-2 sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20 px-4" : "w-96 lg:w-96"
      }`}
      aria-label="Sidebar"
    >
      {/* Sidebar toggle button */}
      <div className="flex justify-end m-1 mb-4">
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
      <div
        {...events}
        ref={ref}
        className={`flex-1 transition-all duration-300 ${
          isCollapsed
            ? "overflow-y-hidden"
            : "overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-sky-300 scrollbar-visible px-4 "
        }`}
      >
        {/* Dashboard Link */}
        <Link to="/">
          <div
            className="flex items-center gap-2 p-2 mb-4 transition-all duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            aria-label="Dashboard"
          >
            <MdOutlineScreenshotMonitor
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7 mx-auto" : "w-5 h-5"
              }`}
            />
            {!isCollapsed && (
              <p className="text-base font-semibold">Dashboard</p>
            )}
          </div>
        </Link>

        {/* SHOWING ICONS WHEN HIDDEN */}
        {/* BiPurchaseTagAlt */}
        <div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <BiPurchaseTagAlt
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <BsBoxSeam
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <MdOutlineCalculate
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <FaLuggageCart
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <RiContactsFill
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <GiTakeMyMoney
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <BsBoxSeam
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <FaChalkboardTeacher
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <VscServerEnvironment
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <IoDocumentAttachOutline
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <BiDollarCircle
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <MdOutlineSupportAgent
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <IoReturnUpForward
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <FaChalkboardTeacher
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <VscServerEnvironment
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <MdOutlineInventory2
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <MdOutlineHandshake
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
          <div
            className={`flex items-center transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-300 ${
              isCollapsed ? "p-2 mb-2" : "hidden"
            }`}
            aria-label="Dashboard"
          >
            <IoPeopleSharp
              onClick={toggleSidebar}
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "hidden w-0 h-0"
              }`}
            />
          </div>
        </div>

        {/* Apps Section */}
        <div className="mb-2 ">
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
              {/*   Purchase Requisitions */}
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
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
                        ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Raw Material List</span>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
                        ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Create Request</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            {/*  Suppliers */}
            <li>
              <details
                open
                className={`menu-item transition-all duration-300 ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                <summary
                  open
                  className="flex items-center gap-2 cursor-pointer"
                >
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
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  <li className="mt-1">
                    <NavLink
                      to="supplierlist"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">Approved Supplier List</span>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <a
                      href="#submenu2"
                      className="flex items-center justify-between p-2 rounded-md text-base hover:bg-gray-100 transition-colors duration-200 ease-in-out"
                    >
                      Performance Metrics
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            {/* Quotation */}
            <li>
              <details
                className={`menu-item transition-all duration-300 ${
                  isCollapsed ? "hidden" : ""
                }`}
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
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">
                        Request For Quotations (RFQ's)
                      </span>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">Compare Supplier Quotes</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            {/* Purchase Orders */}
            <li>
              <details
                open
                className={`menu-item transition-all duration-300 ${
                  isCollapsed ? "hidden" : ""
                }`}
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
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Purchase Order List */}
                  <li className="mt-1">
                    <NavLink
                      to="/purchaseOrderList"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Purchase Order List</span>
                    </NavLink>
                  </li>

                  {/* Create Purchase Order */}
                  <li className="mt-1">
                    <NavLink
                      to="/CreatePurchaseOrder"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Create Purchase Order</span>
                    </NavLink>
                  </li>

                  {/* Track Orders */}
                  <li className="mt-1">
                    <NavLink
                      to="/trackorders"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Track Orders</span>
                    </NavLink>
                  </li>

                  {/* Order Fulfillment Status */}
                  <li className="mt-1">
                    <NavLink
                      to="/orderfulfillmentstatus"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">
                        Order Fulfillment Status
                      </span>
                    </NavLink>
                  </li>

                  {/* Edit Purchase Order */}
                  <li className="mt-1">
                    <NavLink
                      to="/EditPurchaseOrder"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Edit Purchase Order</span>
                    </NavLink>
                  </li>

                  {/* Purchase Order Reports
                  <li className="mt-1">
                    <NavLink
                      to="/PurchaseOrderReports"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out ${
                          isActive
                            ? "text-base-200 bg-blue-500 font-bold"
                            : "text-black hover:bg-gray-100"
                        }`
                      }
                    >
                      <span className="text-base">Purchase Order Reports</span>
                    </NavLink>
                  </li> */}
                </ul>
              </details>
            </li>

            {/* Contact */}
            <li>
              <details
                className={`menu-item transition-all duration-300 ${
                  isCollapsed ? "hidden" : ""
                }`}
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
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="viewcontacts"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">View Contacts</span>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="renewalsexpirations"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">Renewals & Expirations</span>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>

            {/* Budget Approval */}
            <li>
              <details
                className={`menu-item transition-all duration-300 ${
                  isCollapsed ? "hidden" : ""
                }`}
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
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="submit-for-approval"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">Submit For Approval</span>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="approval-history"
                      className={({ isActive }) =>
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
            ${
              isActive
                ? "text-base-200 bg-blue-500 font-bold"
                : "text-black hover:bg-gray-100"
            }`
                      }
                    >
                      <span className="text-base">Approval History</span>
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
            {/*   Supplier Onboarding */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BsBoxSeam
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Supplier Onboarding
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
                      <p className="text-base">Registration Requests</p>
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
                      <p className="text-base">Compliance Verification</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            {/* Supplier Dashboard */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <FaChalkboardTeacher
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Supplier Dashboard
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
                      <p className="text-base">Order Overview</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Payment Status
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Order Management */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <VscServerEnvironment
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Order Management
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
                      <p className="text-base">View Purchase Orders</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Confirm Delivery Dates
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Document Exchange */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <IoDocumentAttachOutline
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Document Exchange
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
                      <p className="text-base">Upload/Download Documents</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Contract Agreement
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Bids & Tenders */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BiDollarCircle
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Bids & Tenders
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
                      <p className="text-base">Active Tenders</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Submit Bids/Quotations
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Invoice & Payments */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <TbFileInvoice
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Submit Invoices
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
                      <p className="text-base">Payment Tracking</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Payment Tracking
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Support & Disputes */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <MdOutlineSupportAgent
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Support & Disputes
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
                      <p className="text-base">Raise A Tickets</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Dispute Resolutions Status
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>

          {userData && userData.role === "admin" && (
            <div>
              <p
                className={`text-gray-500 font-semibold text-base ${
                  isCollapsed ? "hidden" : ""
                }`}
              >
                Account Management
              </p>
              <ul className="w-full menu rounded-box">
                {/* Return Authorization (RMA) */}
                <li>
                  <details
                    open
                    className={`menu-item ${isCollapsed ? "hidden" : ""}`}
                  >
                    <summary className="flex items-center gap-2 cursor-pointer">
                      <IoPeopleSharp
                        className={`transition-all duration-300 ${
                          isCollapsed ? "w-7 h-7" : "w-5 h-5"
                        }`}
                      />
                      {!isCollapsed && (
                        <span className="ml-2 text-base font-semibold">
                          Parties
                        </span>
                      )}
                    </summary>
                    <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                      <li className="mt-1">
                        <NavLink
                          to="user"
                          className={({ isActive }) =>
                            isActive
                              ? "text-base-200 bg-blue-500 font-bold"
                              : "text-black"
                          }
                        >
                          <p className="text-base">Customer</p>
                        </NavLink>
                      </li>
                      <li className="mt-1">
                        <NavLink
                          to="suppliers"
                          className={({ isActive }) =>
                            isActive
                              ? "text-base-200 bg-blue-500 font-bold"
                              : "text-black"
                          }
                        >
                          <p className="text-base">Suppliers</p>
                        </NavLink>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </div>
          )}

          {/* RETURN MANAGEMENT */}
          <p
            className={`text-gray-500 font-semibold text-base ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Return Management
          </p>
          <ul className="w-full menu rounded-box">
            {/* Return Authorization (RMA) */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <IoReturnUpForward
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Return Authorization (RMA)
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Create Return Request</p>
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
                      <p className="text-base">Approvals & Denials</p>
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            {/* Reverse Logistics */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <FaChalkboardTeacher
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Reverse Logistics
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
                      <p className="text-base">Schedule Return Pickups</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Track Return Shipments
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Return Documentation */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <VscServerEnvironment
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Return Documentation
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
                      <p className="text-base">Return Orders</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Reason codes & Notes
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Inventory Updates */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <MdOutlineInventory2
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Inventory Updates
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
                      <p className="text-base">Update Stock Levels</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Restocking Procedures
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            {/* Warranty & claims */}
            <li>
              <details className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <MdOutlineHandshake
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="ml-2 text-base font-semibold">
                      Warranty & claims
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
                      <p className="text-base">Warranty Status</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Claim Submission
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

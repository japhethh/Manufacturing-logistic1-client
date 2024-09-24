import { useState, useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import vendor from "./Assets/vendor.png";
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
      <div className="flex justify-end m-1 mb-2">
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
        className="flex items-center justify-center gap-2 mb-2 cursor-pointer"
        aria-label="Dashboard Logo"
      >
        <img src={vendor} alt="Dashboard logo" className="w-16" />
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
          {/* Procurement Dropdown */}
          <ul className="w-full menu rounded-box">
            {/* Purchase Requisitions */}
            <NavLink to="rawmaterialrequest">
              <li className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <div className="flex items-center cursor-pointer">
                  <BiPurchaseTagAlt
                    className={`transition-all duration-300 ${
                      isCollapsed ? "w-7 h-7" : "w-5 h-5"
                    }`}
                  />
                  {!isCollapsed && (
                    <span className="text-base font-semibold">
                      Purchase Requisitions
                    </span>
                  )}
                </div>
              </li>
            </NavLink>

            {/* Suppliers */}
            <li
              className={`menu-item transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              <NavLink
                to="supplierlist"
                className={({ isActive }) =>
                  `flex items-center gap-2  rounded-md transition-colors duration-200 ease-in-out 
        ${
          isActive
            ? "text-base-200 bg-blue-500 font-bold"
            : "text-black hover:bg-gray-100"
        }`
                }
              >
                <BsBoxSeam
                  className={`transition-all duration-300 ${
                    isCollapsed ? "w-7 h-7" : "w-5 h-5"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-base font-semibold">Suppliers</span>
                )}
              </NavLink>
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
                    <span className="text-base font-semibold mr-auto">Quotation</span>
                  )}
                </summary>
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Request For Quotations */}
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
                  {/* Compare Supplier Quotes */}
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
                    <span className="text-base font-semibold mr-auto">
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
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
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
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
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
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
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
                        `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
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
                    <span className="text-base font-semibold mr-auto">Contact</span>
                  )}
                </summary>
                <ul className={`pl-4 mt-2 ${isCollapsed ? "hidden" : ""}`}>
                  {/* View Contacts */}
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
                  {/* Renewals & Expirations */}
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
            <li
              className={`menu-item transition-all duration-300 ${
                isCollapsed ? "hidden" : ""
              }`}
            >
              <div className="flex items-center gap-2 cursor-pointer">
                <GiTakeMyMoney
                  className={`transition-all duration-300 ${
                    isCollapsed ? "w-7 h-7" : "w-5 h-5"
                  }`}
                />
                {!isCollapsed && (
                  <span className="text-base font-semibold">
                    Budget Approval
                  </span>
                )}
              </div>
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
                    <span className="ml-2 text-base font-semibold mr-auto">
                      Supplier Onboarding
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="registrationrequest"
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
                      to="complianceverification"
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                        <span className="ml-2 text-base font-semibold mr-auto">
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
            className={`text-gray-500 font-semibold text-base mr-auto ${
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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
                    <span className="ml-2 text-base font-semibold mr-auto">
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

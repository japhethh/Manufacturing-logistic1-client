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
import { FaWpforms } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-black px-4 py-4 border-r-2 sticky top-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72 lg:w-80"
      }`}
      aria-label="Sidebar"
    >
      {/* Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleSidebar}
          className={`p-1 text-black border border-gray-300 rounded-md hover:bg-gray-200 transition duration-200 ${
            isCollapsed ? "w-11" : "w-11"
          }`}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? "▶" : "◀"}
        </button>
      </div>

      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer mb-8 justify-center"
        aria-label="Dashboard Logo"
      >
        <img src={layout} alt="Dashboard logo" className="w-10 h-10" />
        {!isCollapsed && <p className="text-xl font-bold">Dashboard</p>}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Dashboard */}
        <Link to="/">
          <div
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition-all duration-300 p-2 rounded-md mb-4 cursor-pointer"
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
            Apps
          </p>
          <ul className="menu rounded-box w-full">
            {/* Procurement */}
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
                    <span className="text-lg font-semibold">Procurement</span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li>
                    <NavLink
                      to="orderhistory"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Order History</p>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive
                          ? "text-base-200 bg-blue-500 font-bold"
                          : "text-black"
                      }
                    >
                      <p className="text-base">Purchase Order</p>
                    </NavLink>
                  </li>
                  <li>
                    <a href="#supplier-management" className="text-base">
                      Supplier Management
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            {/* Audit Management */}
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
                    <span className="text-lg font-semibold">
                      Audit Management
                    </span>
                  )}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li>
                    <a href="#submenu1" className="text-base">
                      Submenu 1
                    </a>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">
                      Submenu 2
                    </a>
                  </li>
                  <li>
                    <details open>
                      <summary className="text-base">Parent</summary>
                      <ul className="pl-4">
                        <li>
                          <a href="#submenu1" className="text-base">
                            Submenu 1
                          </a>
                        </li>
                        <li>
                          <a href="#submenu2" className="text-base">
                            Submenu 2
                          </a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* File Manager */}
        <div
          className="flex gap-2 items-center text-base cursor-pointer mb-2 hover:text-blue-500 transition"
          aria-label="File Manager"
        >
          <IoFileTrayOutline
            className={`transition-all duration-300 ${
              isCollapsed ? "w-7 h-7" : "w-5 h-5"
            }`}
          />
          {!isCollapsed && (
            <p className="text-lg font-semibold">File Manager</p>
          )}
        </div>

        {/* Chat */}
        <div
          className="flex gap-2 items-center text-base cursor-pointer mb-2 hover:text-blue-500 transition"
          aria-label="Chat"
        >
          <IoChatboxOutline
            className={`transition-all duration-300 ${
              isCollapsed ? "w-7 h-7" : "w-5 h-5"
            }`}
          />
          {!isCollapsed && <p className="text-lg font-semibold">Chat</p>}
        </div>

        {/* Pages */}
        <div className="mt-4">
          <p
            className={`text-gray-500 mb-2 font-semibold text-base ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            Pages
          </p>
          <div
            className="flex gap-2 items-center text-base cursor-pointer mb-2 hover:text-blue-500 transition"
            aria-label="Landing Page"
          >
            <RiFilePaper2Line
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "w-5 h-5"
              }`}
            />
            {!isCollapsed && <p className="text-lg font-semibold">Landing</p>}
          </div>
        </div>

        {/* UI Showcase */}
        <div className="mt-4">
          <p
            className={`text-gray-500 mb-2 font-semibold text-base ${
              isCollapsed ? "hidden" : ""
            }`}
          >
            UI Showcase
          </p>
          <div
            className="flex gap-2 items-center text-base cursor-pointer mb-2 hover:text-blue-500 transition"
            aria-label="Components"
          >
            <FiBox
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "w-5 h-5"
              }`}
            />
            {!isCollapsed && (
              <p className="text-lg font-semibold">Components</p>
            )}
          </div>
          <div
            className="flex gap-2 items-center text-base cursor-pointer mb-2 hover:text-blue-500 transition"
            aria-label="Forms"
          >
            <FaWpforms
              className={`transition-all duration-300 ${
                isCollapsed ? "w-7 h-7" : "w-5 h-5"
              }`}
            />
            {!isCollapsed && <p className="text-lg font-semibold">Forms</p>}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4">
        <p
          className={`text-gray-500 mb-2 font-semibold text-base ${
            isCollapsed ? "hidden" : ""
          }`}
        >
          Others
        </p>
        <div
          className="flex gap-2 items-center text-base cursor-pointer mb-3 hover:text-blue-500 transition"
          aria-label="Documentation"
        >
          <IoDocumentTextOutline
            className={`transition-all duration-300 ${
              isCollapsed ? "w-7 h-7" : "w-5 h-5"
            }`}
          />
          {!isCollapsed && (
            <p className="text-lg font-semibold">Documentation</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

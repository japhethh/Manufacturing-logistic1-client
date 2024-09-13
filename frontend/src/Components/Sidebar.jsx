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
  // State to track sidebar collapse/expand status
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Function to toggle sidebar state between collapsed and expanded
  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div
      className={`flex flex-col h-screen bg-white text-black px-4 py-4 border-r-2 sticky top-0 transition-all duration-300 ease-in-out ${
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
      <div className="flex items-center justify-center gap-2 mb-8 cursor-pointer" aria-label="Dashboard Logo">
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
            <MdOutlineScreenshotMonitor className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
            {!isCollapsed && <p className="text-base font-semibold">Dashboard</p>}
          </div>
        </Link>

        {/* Apps Section */}
        <div className="mb-2">
          <p className={`text-gray-500 font-semibold text-base ${isCollapsed ? "hidden" : ""}`}>Apps</p>
          <ul className="w-full menu rounded-box">
            {/* Procurement Dropdown */}
            <li>
              <details open className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <BsBoxSeam className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
                  {!isCollapsed && <span className="ml-2 text-base font-semibold">Procurement</span>}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  {/* Procurement Submenu Items */}
                  <li className="mt-1">
                    <NavLink
                      to="rawmaterialrequest"
                      className={({ isActive }) =>
                        isActive ? "text-base-200 bg-blue-500 font-bold" : "text-black"
                      }
                    >
                      <p className="text-base">Raw Material Request</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <NavLink
                      to="purchaseorder"
                      className={({ isActive }) =>
                        isActive ? "text-base-200 bg-blue-500 font-bold" : "text-black"
                      }
                    >
                      <p className="text-base">Budget Request</p>
                    </NavLink>
                  </li>
                  <li className="mt-1">
                    <a href="#supplier-management" className="text-base">
                      Purchase Orders
                    </a>
                  </li>
                </ul>
              </details>
            </li>

            {/* Audit Management Dropdown */}
            <li>
              <details open className={`menu-item ${isCollapsed ? "hidden" : ""}`}>
                <summary className="flex items-center gap-2 cursor-pointer">
                  <IoFileTrayOutline className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
                  {!isCollapsed && <span className="ml-2 text-base font-semibold">Audit</span>}
                </summary>
                <ul className={`pl-4 ${isCollapsed ? "hidden" : ""}`}>
                  <li>
                    <a href="#submenu1" className="text-base">Submenu 1</a>
                  </li>
                  <li>
                    <a href="#submenu2" className="text-base">Submenu 2</a>
                  </li>
                  <li>
                    <details open>
                      <summary className="text-base">Parent</summary>
                      <ul className="pl-4">
                        <li>
                          <a href="#submenu1" className="text-base">Submenu 1</a>
                        </li>
                        <li>
                          <a href="#submenu2" className="text-base">Submenu 2</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>

        {/* File Manager Section */}
        <div className="flex items-center gap-2 mb-2 text-base transition cursor-pointer hover:text-blue-500" aria-label="File Manager">
          <IoFileTrayOutline className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
          {!isCollapsed && <p className="ml-2 text-base font-semibold">File Manager</p>}
        </div>

        {/* Chat Section */}
        <div className="flex items-center gap-2 mb-2 text-base transition cursor-pointer hover:text-blue-500" aria-label="Chat">
          <IoChatboxOutline className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
          {!isCollapsed && <p className="ml-2 text-base font-semibold">Chat</p>}
        </div>

        {/* Pages Section */}
        <div className="mt-4">
          <p className={`text-gray-500 mb-2 font-semibold text-base ${isCollapsed ? "hidden" : ""}`}>Pages</p>
          <div className="flex items-center gap-2 mb-2 text-base transition cursor-pointer hover:text-blue-500" aria-label="Landing Page">
            <RiFilePaper2Line className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
            {!isCollapsed && <p className="ml-2 text-base font-semibold">Landing</p>}
          </div>
        </div>

        {/* UI Showcase Section */}
        <div className="mt-4">
          <p className={`text-gray-500 mb-2 font-semibold text-base ${isCollapsed ? "hidden" : ""}`}>UI Showcase</p>
          <div className="flex items-center gap-2 mb-2 text-base transition cursor-pointer hover:text-blue-500" aria-label="Components">
            <FiBox className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
            {!isCollapsed && <p className="ml-2 text-base font-semibold">Components</p>}
          </div>
          <div className="flex items-center gap-2 mb-2 text-base transition cursor-pointer hover:text-blue-500" aria-label="Forms">
            <FaWpforms className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
            {!isCollapsed && <p className="ml-2 text-base font-semibold">Forms</p>}
          </div>
        </div>
        <div className="mt-4">
        <p className={`text-gray-500 mb-2 font-semibold text-base ${isCollapsed ? "hidden" : ""}`}>Others</p>
        <div className="flex items-center gap-2 mb-3 text-base transition cursor-pointer hover:text-blue-500" aria-label="Documentation">
          <IoDocumentTextOutline className={`transition-all duration-300 ${isCollapsed ? "w-7 h-7" : "w-5 h-5"}`} />
          {!isCollapsed && <p className="ml-2 text-base font-semibold">Documentation</p>}
        </div>
      </div>
      </div>

      {/* Footer Section */}
      
    </div>
  );
};

export default Sidebar;

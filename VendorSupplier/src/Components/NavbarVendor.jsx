import React from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import joji from "../assets/joji.jpg";
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

const NavbarVendor = () => {
  const menuItems = [
    {
      icon: <FaUserCheck className="mr-3 text-gray-600" />,
      label: "Vendor Registration & Compliance",
      href: "#vendor-registration",
    },
    {
      icon: <FaUserPlus className="mr-3 text-gray-600" />,
      label: "Supplier Onboarding",
      href: "#supplier-onboarding",
    },
    {
      icon: <FaClipboardCheck className="mr-3 text-gray-600" />,
      label: "Purchase Order Management",
      href: "#purchase-orders",
    },
    {
      icon: <FaComments className="mr-3 text-gray-600" />,
      label: "Supplier Communication",
      href: "#supplier-communication",
    },
    {
      icon: <FaShippingFast className="mr-3 text-gray-600" />,
      label: "Inventory & Shipment Tracking",
      href: "#shipment-tracking",
    },
    {
      icon: <FaFileInvoiceDollar className="mr-3 text-gray-600" />,
      label: "Payment & Invoicing",
      href: "#payment-invoicing",
    },
    {
      icon: <FaUserCog className="mr-3 text-gray-600" />,
      label: "Vendor Self-Service Portal",
      href: "#self-service",
    },
    {
      icon: <FaChartLine className="mr-3 text-gray-600" />,
      label: "Supplier Performance Monitoring",
      href: "#performance-monitoring",
    },
    {
      icon: <FaFileContract className="mr-3 text-gray-600" />,
      label: "Basic Contract Management",
      href: "#contract-management",
    },
  ];

  return (
    <div className="navbar sticky top-0 z-50 bg-white px-5">
      {/* Mobile Drawer Sidebar */}
      <div className="navbar-start block md:hidden lg:hidden w-32">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Toggle Button */}
            <label htmlFor="my-drawer" className="drawer-button">
              <TbLayoutSidebarRightCollapseFilled className="size-6 text-black" />
            </label>
          </div>

          {/* Sidebar Content */}
          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="Close sidebar" className="drawer-overlay"></label>
            <div className="menu text-black bg-white min-h-full w-80 px-4 py-5 shadow-lg">
              {/* Search Bar */}
              <div className="w-full max-w-sm min-w-[200px] mb-5">
                <div className="relative">
                  <input
                    className="w-full bg-transparent placeholder:text-slate-400 text-blue-600 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <button
                    className="absolute top-1 right-1 flex items-center rounded bg-blue-700 py-1 px-2.5 text-white transition-all duration-300 hover:bg-slate-700 focus:bg-blue-600"
                    type="button"
                    aria-label="Search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sidebar Links */}
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={index} className="hover:bg-gray-200 rounded-md transition-colors">
                    <NavLink
                      to={item.href}
                      className="flex items-center px-4 py-2 text-gray-800 font-semibold hover:text-blue-700 duration-200"
                      onClick={() => (document.getElementById("my-drawer").checked = false)} // Close drawer on link click
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Additional Links */}
              <div className="grid gap-5 mt-5">
                {["Profile", "Settings", "Log out"].map((item, index) => (
                  <a
                    key={index}
                    className="font-semibold text-xl cursor-pointer hover:text-blue-700 transition duration-300"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WINDOWS */}
      <div className="flex justify-between w-full">
        <div className="navbar-center">
          <a className="text-black font-bold text-2xl">Vendor Supplier</a>
        </div>
        <div className="navbar-end gap-4 flex">
          <button className="text-black size-8 p-2 hidden md:block lg:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="text-black size-8 p-2">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <div className="dropdown dropdown-end items-center hidden md:block lg:block">
            <img
              src={joji}
              tabIndex={0}
              role="button"
              alt="/"
              className="rounded-full size-8 "
            />
            <ul
              tabIndex={0}
              className="menu dropdown-content text-black rounded-box z-[1] mt-4 w-52 p-2 shadow"
            >
              <div>
                <a>Setting</a>
              </div>
              <div>
                <a>Profile</a>
              </div>
              <div>
                <a>Log out</a>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarVendor;

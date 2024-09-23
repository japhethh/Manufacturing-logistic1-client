import React from "react";
import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import joji from "../assets/joji.jpg";
const NavbarVendor = () => {
  return (
    <div className="navbar sticky top-0 z-50 bg-white px-5">
      {/* mobile drawer sidebar */}
      <div className="navbar-start block md:hidden lg:hidden">
        {/* MOBILE DR4WER */}
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="drawer-button">
              <TbLayoutSidebarRightCollapseFilled className="size-6 text-black" />{" "}
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <a>Sidebar Item 1</a>
              </li>
              <li>
                <a>Sidebar Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <a className="text-black font-bold text-2xl">Vendor Supplier</a>
      </div>
      <div className="navbar-end gap-4">
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
            <li>
              <a>Setting</a>
            </li>
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Log out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavbarVendor;

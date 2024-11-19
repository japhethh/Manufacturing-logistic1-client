import { TbLayoutSidebarRightCollapseFilled } from "react-icons/tb";
import { FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaWarehouse,
  FaShippingFast,
  FaFileInvoice,
  FaComments,
  FaUserCog,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai"; // Add this import
import { BsClipboardCheckFill } from "react-icons/bs"; // Add this import
import men from "../assets/men.jpg";
import vendor from "../assets/vendor.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import verifyStore, { apiURL } from "../context/verifyStore";
import io from "socket.io-client";
import NotificationItem from "../Components/Notification/NotificationItem.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const NavbarVendor = () => {
  const navigate = useNavigate();

  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  const { addNotification, token } = verifyStore();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/notifications/`, {
        headers: { token: token },
      });
      console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };

  // Function to update notifications state after marking as read
  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif?._id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  useEffect(() => {
    const socket = io(ENDPOINT);

    // Listen for notifications from the server
    socket.on("vendor-notification", (notification) => {
      addNotification(notification); // Add notification to the store
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
      console.log(notification);
    });

    socket.on("invoice-approve", (notification) => {
      addNotification(notification);
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    // Cleanup on component unmount
    return () => {
      // socket.off("vendor-notification");
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [ENDPOINT, addNotification]);

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
      icon: <BsClipboardCheckFill className="text-2xl" />,
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

  const handleLogout = () => {
    window.location.reload();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-white px-5 shadow-md">
      {/* Mobile Drawer Sidebar */}
      <div className="navbar-start block md:hidden lg:hidden w-32">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Toggle Button */}
            <label htmlFor="my-drawer" className="drawer-button">
              <TbLayoutSidebarRightCollapseFilled className="text-black h-6 w-6" />
            </label>
          </div>

          {/* Sidebar Content */}
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              className="drawer-overlay"
              aria-label="Close sidebar"
            ></label>
            <div className="bg-white min-h-full w-80 px-4 py-5 shadow-lg transition-transform transform duration-300 ease-in-out">
              {/* Logo */}
              <NavLink to="/dashboardvendor" className="flex items-center mb-8">
                <img
                  src={vendor}
                  alt="Vendor Management Logo"
                  className="w-16 h-16 rounded-full border border-gray-300 transition-transform transform hover:scale-105"
                />
                <h2 className="text-2xl font-semibold text-gray-800 ml-2">
                  Vendor Management
                </h2>
              </NavLink>

              {/* Sidebar Links */}
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li
                    key={index}
                    className="hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <NavLink
                      to={item.to}
                      className="flex items-center px-4 py-2 text-gray-800 font-semibold hover:text-blue-700 duration-200"
                      onClick={() =>
                        (document.getElementById("my-drawer").checked = false)
                      }
                    >
                      <span className="mr-2">{item.icon}</span>
                      <span>{item.label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the Navbar Content */}
      <div className="flex justify-between w-full">
        <div className="navbar-center">
          <span className="text-black font-bold text-2xl">Vendor Supplier</span>
        </div>

        {/*  */}
        <div className="navbar-end gap-4 flex">
          {/* Notification Dropdown */}
          <div className="dropdown dropdown-end items-center hidden md:block lg:block ">
            <button className="text-black size-8 p-2 " tabIndex={0}>
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-700" // Added size and color
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item">
                  {notifications.filter((notif) => !notif.isRead).length}
                </span>
              </div>
            </button>
            <div
              tabIndex={0}
              className="mt-2 p-4 shadow-lg rounded-lg dropdown-content bg-white text-gray-800 w-96 max-h-[600px] overflow-y-auto flex flex-col"
            >
              <div className="pb-2">
                <h1 className="font-bold text-2xl px-3">Notifications</h1>
                <div className="border-b border-gray-300 my-2"></div>
              </div>
              {notifications.filter((notif) => !notif.isRead).length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-gray-600">
                  No notifications
                </div>
              ) : (
                <div className="flex-grow space-y-4">
                  {notifications
                    .filter((notif) => !notif.isRead)
                    .map((notification, index) => (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown dropdown-end ml-2 items-center hidden md:block lg:block">
            <img
              src={men}
              tabIndex={0}
              role="button"
              alt="User Profile"
              className="rounded-full w-8 h-8 cursor-pointer"
            />
            <ul
              tabIndex={0}
              className="mt-2 p-2 shadow-lg rounded-lg menu dropdown-content bg-white text-gray-800 w-52"
            >
              {/* Profile */}
              <li>
                <NavLink
                  to="/profile"
                  className="hover:bg-gray-200 hover:text-blue-500 font-semibold flex items-center gap-2"
                >
                  <FaUser className="text-xl" />
                  Profile
                </NavLink>
              </li>
              {/* Settings */}
              <li>
                <NavLink
                  to="/settings"
                  className="hover:bg-gray-200 hover:text-blue-500 font-semibold flex items-center gap-2"
                >
                  <FaCog className="text-xl" />
                  Settings
                </NavLink>
              </li>
              {/* Logout */}
              <li>
                <span
                  className="hover:bg-gray-200 hover:text-blue-500 font-semibold flex items-center gap-2 cursor-pointer"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className="text-xl" />
                  Log out
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarVendor;

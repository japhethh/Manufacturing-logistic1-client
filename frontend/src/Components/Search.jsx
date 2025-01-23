import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import MobileSidebar from "./MobileSidebar";
import Store, { apiURL } from "../context/Store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import io from "socket.io-client";
import NotificationItem from "./Notification/NotificationItem";

const Search = () => {
  const { userData, token } = Store(); // Access global state and actions
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(null);
  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  useEffect(() => {
    fetchUserData();
    fetchNotification();
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/notificationsLogistic`, {
        headers: { token: token },
      });
      // console.log(response.data);
      setNotifications(response.data);
    } catch (error) {
      // toast.error(error?.response.data.message);
      console.log(error?.response.data.message);
    }
  };

  useEffect(() => {
    const socket = io(ENDPOINT, {
      reconnection: true, // Enables automatic reconnection
      // reconnectionAttempts: 99999, // Number of reconnection attempts
      // reconnectionDelay: 1000, // Delay in ms between reconnection attempts
      // reconnectionDelayMax: 5000, // Maximum delay between reconnections
    });
    socket.on("logistic-notification", (notification) => {
      setNotifications((preNotification) => [...preNotification, notification]);

      console.log(notification);

      return () => {
        socket.disconnect();
      };
    });

    socket.on("update-profile", (updateProfile) => {
      setUser(updateProfile);

      toast.warn("Kupalll");
      return () => {
        socket.disconnect();
      };
    });
  }, [ENDPOINT]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log({ error: "Token not found in localStorage", loading: false });
      return;
    }

    try {
      const response = await axios.get(`${apiURL}/api/user`, {
        headers: {
          token: token,
        },
      });

      setUser(response.data);
    } catch (err) {
      console.log(err?.response.data.message);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen); // Toggle the modal's visibility
  };

  return (
    <div className="w-full py-4 px-4 bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-end">
        {/* Sidebar toggle button */}
        <div className="lg:hidden flex items-center">
          <label htmlFor="my-drawer" className="drawer-button mr-2">
            <IoIosMenu size={30} />
          </label>
        </div>

        {/* Right-side icons and user profile */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Notification Dropdown */}
          <div className="dropdown dropdown-end items-center mr-2">
            <button className="text-black size-8 p-2 " tabIndex={0}>
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
                <span className="badge badge-sm bg-blue-600 font-bold text-white indicator-item">
                  {notifications.filter((notif) => !notif.isRead).length}
                </span>
              </div>
            </button>

            {/* NOTIFCATION BODY */}
            <ul
              tabIndex={0}
              className="mt-2 p-2 shadow-lg rounded-lg menu dropdown-content bg-white text-gray-800 max-w-xs md:max-w-md lg:max-w-lg"
            >
              <div className="overflow-y-scroll max-h-96 w-72 md:w-80">
                <div>
                  <h1 className="font-semibold text-lg md:text-xl lg:text-2xl px-3">
                    Notifications
                  </h1>
                  <div className="divider"></div>
                </div>

                {notifications.filter((notif) => !notif.isRead).length === 0 ? (
                  <li className="p-2 text-sm md:text-base">
                    No new notifications
                  </li>
                ) : (
                  notifications
                    .filter((notif) => !notif.isRead) // Only display unread notifications
                    .map((notification, index) => (
                      <NotificationItem
                        key={index}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead} // Pass the callback here
                      />
                    ))
                )}
              </div>
            </ul>
          </div>
          {/* PROFILLE */}
          <div className="relative dropdown dropdown-end">
            <img
              src={user?.image ? user?.image : userData?.image}
              tabIndex={0}
              role="button"
              alt="User profile"
              className="rounded-full w-8 h-8 md:w-10 md:h-10 cursor-pointer border-2 border-gray-300"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box shadow-lg mt-2 w-40 md:w-48 p-2"
              aria-label="User menu"
            >
              <li>
                <a href="#profile" className="hover:bg-gray-100 p-2 rounded font-bold">
                  {userData?.name}
                </a>
              </li>
              <li>
                <Link to="/profile" className="hover:bg-gray-100 p-2 rounded">
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/system_settings"
                  className="hover:bg-gray-100 p-2 rounded"
                >
                  Settings
                </Link>
              </li>
              <li>
                <a
                  href="#logout"
                  onClick={toggleModal} // Show the modal on click
                  className="hover:bg-gray-100 p-2 rounded"
                >
                  Log out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile Search Form (Hidden) */}
      <form method="GET" action="" className="md:hidden hidden">
        <div className="relative flex items-center w-full bg-white border rounded-full shadow-lg">
          <input
            name="episodequery"
            id="title"
            className="w-full p-2 pl-4 pr-12 border-0 outline-none rounded-full text-gray-700"
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 flex items-center px-4 text-white bg-black hover:bg-gray-700 rounded-full"
            aria-label="Search"
          >
            <span className="text-sm font-semibold">Search</span>
          </button>
        </div>
      </form>

      {/* Sidebar */}
      <div className="drawer lg:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="drawer-button hidden">
            <IoIosMenu size={24} />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content h-full max-h-screen w-80 p-4 overflow-y-auto">
            {/* Sidebar content here */}
            <MobileSidebar />
          </ul>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Logout</h3>
            <p className="py-4">Are you sure you want to log out?</p>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={handleLogout} // Log out when confirmed
              >
                Yes, Log Out
              </button>
              <button
                className="btn"
                onClick={toggleModal} // Close modal when canceled
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

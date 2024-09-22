import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import MobileSidebar from "./MobileSidebar";
import Store from "../context/Store";

const Search = () => {
  const { userData } = Store();  // Access global state and actions
  const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);  // Toggle the modal's visibility
  };

  return (
    <div className="w-full py-4 px-4 bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Sidebar toggle button */}
        <div className="lg:hidden flex items-center">
          <label htmlFor="my-drawer" className="drawer-button">
            <IoIosMenu size={24} />
          </label>
        </div>

        {/* Search form for medium and larger screens */}
        <form
          method="GET"
          action=""
          className="hidden md:flex flex-grow mx-auto max-w-2xl"
        >
          <div className="relative flex items-center w-full rounded-full shadow-lg">
            <input
              name="episodequery"
              id="title"
              className="w-[590px] p-2 pl-4 pr-12 border border-stone-300 rounded-lg text-gray-70"
              type="text"
              placeholder="Search..."
              aria-label="Search"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 bottom-0 flex items-center px-4 text-white bg-blue-700 hover:bg-blue-600 duration-150 rounded-lg"
              aria-label="Search"
            >
              <span className="text-sm font-semibold">Search</span>
            </button>
          </div>
        </form>

        {/* Right-side icons and user profile */}
        <div className="flex items-center gap-3 md:gap-4">
          <MdOutlineDarkMode
            className="cursor-pointer text-xl md:text-2xl hover:text-gray-600"
            aria-label="Toggle dark mode"
          />
          <IoMdNotificationsOutline
            className="cursor-pointer text-xl md:text-2xl hover:text-gray-600"
            aria-label="Notifications"
          />
          <div className="relative dropdown dropdown-end">
            <img
              src="https://i.pinimg.com/736x/ea/21/05/ea21052f12b135e2f343b0c5ca8aeabc.jpg"
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
                <a href="#profile" className="hover:bg-gray-100 p-2 rounded">
                  {userData?.name}
                </a>
              </li>
              <li>
                <a href="#profile" className="hover:bg-gray-100 p-2 rounded">
                  Profile
                </a>
              </li>
              <li>
                <a href="#settings" className="hover:bg-gray-100 p-2 rounded">
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#logout"
                  onClick={toggleModal}  // Show the modal on click
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
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
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
                onClick={handleLogout}  // Log out when confirmed
              >
                Yes, Log Out
              </button>
              <button
                className="btn"
                onClick={toggleModal}  // Close modal when canceled
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

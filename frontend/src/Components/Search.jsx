import React from "react";
import { IoIosMenu } from "react-icons/io";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";

const Search = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="w-full py-4 px-4 md:px-6 lg:px-8 bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Sidebar toggle button */}
        <div className="relative flex items-center gap-4 md:hidden lg:hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle hidden" />
          <label
            htmlFor="my-drawer"
            className="cursor-pointer text-2xl"
            aria-label="Open sidebar"
          >
            <IoIosMenu />
          </label>
        </div>

        {/* Search form */}
        <form
          method="GET"
          action=""
          className="hidden md:flex lg:flex flex-grow mx-auto max-w-2xl"
        >
          <div className="relative flex items-center w-full bg-white border rounded-full shadow-lg">
            <input
              name="episodequery"
              id="title"
              className="w-full p-2 pl-4 pr-12 border-0 outline-none rounded-full text-gray-700"
              type="text"
              placeholder="What are you looking for?"
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

        {/* Right-side icons and user profile */}
        <div className="flex items-center gap-4">
          <MdOutlineDarkMode className="cursor-pointer text-2xl hover:text-gray-600" aria-label="Toggle dark mode" />
          <IoMdNotificationsOutline className="cursor-pointer text-2xl hover:text-gray-600" aria-label="Notifications" />
          <div className="relative dropdown dropdown-end">
            <img
              src="https://i.pinimg.com/736x/ea/21/05/ea21052f12b135e2f343b0c5ca8aeabc.jpg"
              tabIndex={0}
              role="button"
              alt="User profile"
              className="rounded-full w-10 h-10 cursor-pointer border-2 border-gray-300"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box shadow-lg mt-2 w-48 p-2"
              aria-label="User menu"
            >
              <li>
                <a href="#profile" className="hover:bg-gray-100 p-2 rounded">Profile</a>
              </li>
              <li>
                <a href="#settings" className="hover:bg-gray-100 p-2 rounded">Settings</a>
              </li>
              <li>
                <a href="#logout" onClick={handleLogout} className="hover:bg-gray-100 p-2 rounded">Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

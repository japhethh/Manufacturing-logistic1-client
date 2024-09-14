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
    <div className="w-full py-5 px-2 md:px-10 lg:px-10 bg-white text-black/70 h-[85px] rounded-l-sm sticky top-0 z-50">
      <div className="flex justify-between max-md:flex max-md:justify-end">
        

        <div className="flex gap-5 items-center w-[600px]">
          {/* Sidebar toggle button */}

          <IoIosMenu className="inline-block cursor-pointer md:hidden lg:hidden size-8" />


          {/* Search form */}
          <form method="GET" action="" className="hidden md:inline-block lg:inline-block">
            <div className="relative flex p-2 bg-white border-2 shadow rounded-xl">
              <span className="flex items-center justify-end w-auto p-2 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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
              </span>
              <input
                name="episodequery"
                id="title"
                className="w-full p-2 border-0 border-white outline-none rounded-xl"
                type="text"
                placeholder="What are you looking for?"
              />
              <button
                type="submit"
                className="p-2 pl-4 pr-4 ml-2 text-xl text-white bg-black hover:bg-gray-700 rounded-xl"
              >
                <p className="text-xs font-semibold">Search</p>
              </button>
            </div>
          </form>
        </div>

        {/* Right-side icons and user profile */}
        {/* DO NOT EDIT */}
        <div className="flex items-center gap-3">
          <MdOutlineDarkMode className="cursor-pointer size-11 md:size-6 lg:size-6" />
          <IoMdNotificationsOutline className="cursor-pointer size-11 md:size-6 lg:size-6" />
          <div className="dropdown dropdown-end">
            <img
              src="https://i.pinimg.com/736x/ea/21/05/ea21052f12b135e2f343b0c5ca8aeabc.jpg"
              tabIndex={0}
              role="button"
              alt="/"
              className="rounded-full w-20 md:w-10 lg:w-10"
            />
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 mt-2 shadow"
            >
              <li>
                <a>Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li onClick={handleLogout}>
                <a>Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

import React from "react";

const MobileSidebar = () => {
  return (
    <div>
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <a className="text-gray-500 font-semibold text-base">Procurement</a>
        </li>
        <li>
          <details open>
            <summary>Parent</summary>
            <ul>
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;

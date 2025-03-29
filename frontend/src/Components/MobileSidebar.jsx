import vendor from "./Assets/vendor.png";
import { MdOutlineScreenshotMonitor } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineStore } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsChatRightText } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { AiOutlineAudit } from "react-icons/ai";

const MobileSidebar = () => {
  return (
    <div className="p-2 h-screen">
      <div
        className="flex items-center justify-center gap-2 mb-8 cursor-pointer"
        aria-label="Dashboard Logo"
      >
        {/* DASHBOARD LOGO */}
        <img src={vendor} alt="Dashboard logo" className="size-16" />
        <p className="text-xl font-bold">Dashboard</p>
      </div>

      {/* Dashboard Link */}
      <Link to="/">
        <div
          className="flex items-center gap-2 p-2 mb-4 transition-all duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
          aria-label="Dashboard"
        >
          <MdOutlineScreenshotMonitor />
          <p className="text-base font-semibold">Dashboard</p>
        </div>
      </Link>
      {/* MESSAGES */}
      <Link to="/messages">
        <div
          className="flex items-center gap-2 p-2 mb-4 transition-all duration-300 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
          aria-label="Dashboard"
        >
          <BsChatRightText />
          <p className="text-base font-semibold">Messages</p>
        </div>
      </Link>

      <p className="text-gray-500 font-semibold text-base">Procurement</p>
      <ul className="w-full menu rounded-box">
        {/* PURCHASE REQUISITION */}
        <NavLink to="rawmaterialrequest">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <BiPurchaseTagAlt />
              <span className="text-base font-semibold">
                Purchase Requisitions
              </span>
            </div>
          </li>
        </NavLink>

        {/* VENDOR MANAGEMENT */}
        <NavLink to="vendormanagement">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <MdOutlineStore />
              <span className="text-base font-semibold">Vendor Management</span>
            </div>
          </li>
        </NavLink>

        {/* BIDDING */}
        <NavLink to="/bidding-category">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <FaRegMoneyBillAlt />
              <span className="text-base font-semibold">Bidding</span>
            </div>
          </li>
        </NavLink>

        {/* Purchase Orders */}
        <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <FaLuggageCart className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">
                Purchase Orders
              </span>
            </summary>
            <ul className={`pl-4 mt-2  ? "hidden" : ""}`}>
              <li className="mt-1">
                <NavLink
                  to="purchaseorderlist"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Purchase Order List</span>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="createpurchaseorder"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Create Purchase Order</span>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="trackorders"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Track Orders</span>
                </NavLink>
              </li>
              {/* CLOSED ORDER FULFILLMENT STATUS */}
              {/* <li className="mt-1">
                <NavLink
                  to="orderfulfillmentstatus"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Order Fulfillment Status</span>
                </NavLink>
              </li> */}
            </ul>
          </details>
        </li>

        {/* INVOICE */}
        <NavLink to="/invoice/all">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <FaFileInvoice />
              <span className="text-base font-semibold">Invoice</span>
            </div>
          </li>
        </NavLink>

        {/* PAYMENT */}
        <NavLink to="/paymentList">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <FaMoneyCheckDollar />
              <span className="text-base font-semibold">Payment</span>
            </div>
          </li>
        </NavLink>

        {/* Inventory */}
        <NavLink to="/inventoryLogistic">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <FaMoneyCheckDollar />
              <span className="text-base font-semibold">Inventory</span>
            </div>
          </li>
        </NavLink>
      </ul>

      {/* RETURN MANAGEMENT */}
      <p className="text-gray-500 font-semibold text-base mr-auto">
        Return Manegement
      </p>
      <ul className="w-full menu rounded-box">
        {/* Inventory */}
        <NavLink to="/discrepancy_report">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <MdOutlineReportProblem />
              <span className="text-base font-semibold">
                Discrepancy Reports
              </span>
            </div>
          </li>
        </NavLink>

        {/* Return Authorization */}
        <NavLink to="/return-requests">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <IoMdReturnLeft />
              <span className="text-base font-semibold">
                Return Authorization
              </span>
            </div>
          </li>
        </NavLink>

        {/* USER MANAGEMENT */}
        {/* <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <IoPeopleSharp className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">
                User Management
              </span>
            </summary>
            <ul className={`pl-4 mt-2  ? "hidden" : ""}`}>
              <li className="mt-1">
                <NavLink
                  to="user"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">View All Accounts</span>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="requestlist"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Account Request</span>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}
        {/* SETTINGS */}
        {/* <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <IoSettingsOutline className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">Settings</span>
            </summary>
            <ul className={`pl-4 mt-2  ? "hidden" : ""}`}>
              <li className="mt-1">
                <NavLink
                  to="system_settings"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base flex gap-2 items-center">
                    <LuSettings2 /> System Settings
                  </span>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Return Authorization (RMA) CLOSED*/}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <IoReturnUpForward className="" />

              <span className="ml-2 text-base font-semibold">
                Return Authorization (RMA)
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="rawmaterialrequest"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base">Create Return Request</p>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="purchaseorder"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base">Approvals & Denials</p>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}
        {/* Reverse Logistics CLOSED*/}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <FaChalkboardTeacher className="" />
              <span className="ml-2 text-base font-semibold mr-auto">
                Reverse Logistics
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="supplierlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base">Schedule Return Pickups</p>
                </NavLink>
              </li>
              <li>
                <a href="#submenu2" className="text-base">
                  Track Return Shipments
                </a>
              </li>
            </ul>
          </details>
        </li> */}
        {/* Return Documentation CLOSED*/}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <VscServerEnvironment className="" />

              <span className="ml-2 text-base font-semibold mr-auto">
                Return Documentation
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="supplierlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base">Return Orders</p>
                </NavLink>
              </li>
              <li>
                <a href="#submenu2" className="text-base">
                  Reason codes & Notes
                </a>
              </li>
            </ul>
          </details>
        </li> */}
        {/* Inventory Updates CLOSED*/}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <MdOutlineInventory2 className="" />

              <span className="ml-2 text-base font-semibold mr-auto">
                Inventory Updates
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="supplierlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base">Update Stock Levels</p>
                </NavLink>
              </li>
              <li>
                <a href="#submenu2" className="text-base">
                  Restocking Procedures
                </a>
              </li>
            </ul>
          </details>
        </li> */}
        {/* Warranty & claims CLOSED*/}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <MdOutlineHandshake className="" />

              <span className="ml-2 text-base font-semibold">
                Warranty & claims
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="supplierlist"
                  className={({ isActive }) =>
                    isActive
                      ? "text-base-200 bg-blue-500 font-bold"
                      : "text-black"
                  }
                >
                  <p className="text-base mr-auto">Warranty Status</p>
                </NavLink>
              </li>
              <li>
                <a href="#submenu2" className="text-base">
                  Claim Submission
                </a>
              </li>
            </ul>
          </details>
        </li> */}
      </ul>

      {/* RETURN MANAGEMENT */}
      {/* <p className="text-gray-500 font-semibold text-base mr-auto">
        Return 
      </p>
      <NavLink to="/discrepancy_report">
        <li className="menu-item">
          <div className="flex items-center cursor-pointer">
            <MdOutlineReportProblem />
            <span className="text-base font-semibold">Discrepancy Reports</span>
          </div>
        </li>
      </NavLink> */}

      {/* AUDIT MANAGEMENT */}
      <p className="text-gray-500 font-semibold text-base mr-auto mt-1">
        Audit Management
      </p>
      {/* DISCREPANCY REPORTS */}
      <NavLink to="/auditLog-logistic">
        <li className="menu-item">
          <div className="flex items-center cursor-pointer">
            <AiOutlineAudit />
            <span className="text-base font-semibold">Audit Logs</span>
          </div>
        </li>
      </NavLink>

      {/* RETURN AUTHORIZATION */}
      <NavLink to="/core2-audit">
        <li className="menu-item">
          <div className="flex items-center cursor-pointer">
            <AiOutlineAudit />
            <span className="text-base font-semibold">Core</span>
          </div>
        </li>
      </NavLink>

      {/* WAREHOUSE */}
      <p className="text-gray-500 font-semibold text-base mr-auto mt-1">
        Warehouse
      </p>
      <NavLink to="/warehouse">
        <li className="menu-item">
          <div className="flex items-center cursor-pointer">
            <TbBuildingWarehouse />
            <span className="text-base font-semibold">Warehouse</span>
          </div>
        </li>
      </NavLink>
    </div>
  );
};

export default MobileSidebar;

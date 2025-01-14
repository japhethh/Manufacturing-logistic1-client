import vendor from "./Assets/vendor.png";
import {
  MdOutlineScreenshotMonitor,
  MdOutlineSupportAgent,
  MdOutlineCalculate,
  MdOutlineInventory2,
  MdOutlineHandshake,
} from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { RiContactsFill } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoDocumentAttachOutline, IoReturnUpForward } from "react-icons/io5";
import { FaChalkboardTeacher, FaLuggageCart } from "react-icons/fa";
import { VscServerEnvironment } from "react-icons/vsc";
import { BiDollarCircle, BiPurchaseTagAlt } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { IoPeopleSharp } from "react-icons/io5";
import Store from "../context/Store";
import { IoSettingsOutline } from "react-icons/io5";
import { GrCurrency } from "react-icons/gr";
import { LuSettings2 } from "react-icons/lu";
import { MdOutlineStore } from "react-icons/md";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FaFileInvoice } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";
import { IoMdReturnLeft } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { BsChatRightText } from "react-icons/bs";

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

        {/* PURCHASE REQUISITION */}
        <NavLink to="rawmaterialrequest">
          <li className="menu-item">
            <div className="flex items-center cursor-pointer">
              <MdOutlineStore />
              <span className="text-base font-semibold">
                Vendor Management
              </span>
            </div>
          </li>
        </NavLink>


        {/* SUPPLIERS CLOSED */}
        {/* <li className="menu-item transition-all duration-300">
          <NavLink
            to="supplierlist"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md transition-colors duration-200 ease-in-out 
        ${
          isActive
            ? "text-base-200 bg-blue-500 font-bold"
            : "text-black hover:bg-gray-100"
        }`
            }
          >
            <BsBoxSeam className="transition-all duration-300 w-5 h-5" />

            <span className="text-base font-semibold">Suppliers</span>
          </NavLink>
        </li> */}

        {/* QOUTATION CLOSED */}
        {/* <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <MdOutlineCalculate className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">Quotation</span>
            </summary>
            <ul className={`pl-4 mt-2  ? "hidden" : ""}`}>
              <li className="mt-1">
                <NavLink
                  to="rawmaterialrequest"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">
                    Request For Quotations (RFQ's)
                  </span>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="purchaseorder"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Compare Supplier Quotes</span>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Purchase Orders */}
        <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <FaLuggageCart className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">Purchase Orders</span>
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

        {/* CONTACT CLOSED */}
        {/* <li>
          <details className="menu-item transition-all duration-300">
            <summary className="flex items-center gap-2 cursor-pointer">
              <RiContactsFill className="transition-all duration-300 w-5 h-5" />

              <span className="text-base font-semibold mr-auto">Contact</span>
            </summary>
            <ul className={`pl-4 mt-2  ? "hidden" : ""}`}>
              <li className="mt-1">
                <NavLink
                  to="viewcontacts"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">View Contacts</span>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="renewalsexpirations"
                  className={({ isActive }) =>
                    `flex items-center justify-between p-2 rounded-md transition-colors duration-200 ease-in-out 
              ${
                isActive
                  ? "text-base-200 bg-blue-500 font-bold"
                  : "text-black hover:bg-gray-100"
              }`
                  }
                >
                  <span className="text-base">Renewals & Expirations</span>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Budget Approval */}
        <li className="menu-item transition-all duration-300">
          <div className="flex items-center gap-2 cursor-pointer">
            <GiTakeMyMoney className="transition-all duration-300 w-5 h-5" />

            <span className="text-base font-semibold">Budget Approval</span>
          </div>
        </li>
      </ul>

      {/* Vendor Section */}
      {/* <p className="text-gray-500 font-semibold text-base">Vendor</p> */}
      {/* <ul className="w-full menu rounded-box"> */}
        {/* Supplier Onboarding */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <BsBoxSeam />
              <span className="ml-2 text-base font-semibold mr-auto">
                Supplier Onboarding
              </span>
            </summary>
            <ul>
              <li className="mt-1">
                <NavLink
                  to="rawmaterialrequest"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Registration Requests</p>
                </NavLink>
              </li>
              <li className="mt-1">
                <NavLink
                  to="purchaseorder"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Compliance Verification</p>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Supplier Dashboard */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <FaChalkboardTeacher />
              <span className="ml-2 text-base font-semibold mr-auto">
                Supplier Dashboard
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="supplierdashboard/orderoverview"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Order Overview</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="supplierdashboard/paymentstatus"
                  className="text-base"
                >
                  Payment Status
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Order Management */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <VscServerEnvironment />
              <span className="ml-2 text-base font-semibold mr-auto">
                Order Management
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="ordermanagement/purchaseorders"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">View Purchase Orders</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="ordermanagement/deliverydates"
                  className="text-base"
                >
                  Confirm Delivery Dates
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Document Exchange */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <IoDocumentAttachOutline />
              <span className="ml-2 text-base font-semibold mr-auto">
                Document Exchange
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="documentexchange/upload"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Upload/Download Documents</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="documentexchange/contract" className="text-base">
                  Contract Agreement
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Bids & Tenders */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <BiDollarCircle />
              <span className="ml-2 text-base font-semibold mr-auto">
                Bids & Tenders
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="bidsandtenders/activetenders"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Active Tenders</p>
                </NavLink>
              </li>
              <li>
                <NavLink to="bidsandtenders/submitbids" className="text-base">
                  Submit Bids/Quotations
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Invoice & Payments */}
        {/* <li>
          <details className="menu-item" aria-expanded="false">
            <summary className="flex items-center gap-2 cursor-pointer">
              <TbFileInvoice />
              <span className="ml-2 text-base font-semibold mr-auto">
                Submit Invoices
              </span>
            </summary>
            <ul className="pl-4">
              <li className="mt-1">
                <NavLink
                  to="invoicesubmission/paymenttracking"
                  className={({ isActive }) =>
                    isActive ? "text-white bg-blue-500 font-bold" : "text-black"
                  }
                >
                  <p className="text-base">Payment Tracking</p>
                </NavLink>
              </li>
            </ul>
          </details>
        </li> */}

        {/* Support & Disputes */}
        {/* <li>
          <details className="menu-item">
            <summary className="flex items-center gap-2 cursor-pointer">
              <MdOutlineSupportAgent className="" />

              <span className="ml-2 text-base font-semibold mr-auto">
                Support & Disputes
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
                  <p className="text-base">Raise A Tickets</p>
                </NavLink>
              </li>
              <li>
                <a href="#submenu2" className="text-base">
                  Dispute Resolutions Status
                </a>
              </li>
            </ul>
          </details>
        </li>
      </ul> */}

      {/* RETURN MANAGEMENT */}
      <p className="text-gray-500 font-semibold text-base mr-auto">Return Management</p>
      <ul className="w-full menu rounded-box">
        {/* Return Authorization (RMA) */}
        <li>
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
        </li>
        {/* Reverse Logistics */}
        <li>
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
        </li>
        {/* Return Documentation */}
        <li>
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
        </li>
        {/* Inventory Updates */}
        <li>
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
        </li>
        {/* Warranty & claims */}
        <li>
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
        </li>
      </ul>
    </div>
  );
};

export default MobileSidebar;

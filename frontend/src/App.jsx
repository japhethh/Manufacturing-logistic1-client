import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import Log from "./Components/Authentication/Log";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";
import RawMaterialRequest from "./Components/RawMaterialRequest.jsx";
import SupplierList from "./Components/Procurements/SupplierList.jsx";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MobileSidebar from "./Components/MobileSidebar";
import Store from "./context/Store";
import User from "./Components/User";
import CreateUser from "./Components/CreateUser";
import CreateSupplier from "./Components/CreateSupplier";
import EditUser from "./Components/EditUser";
import CreatePurchaseOrder from "./Components/Procurements/CreatePurchaseOrder.jsx";
import TrackOrders from "./Components/Procurements/TrackOrders.jsx";
import OrderFulfillmentStatus from "./Components/Procurements/OrderFulfillmentStatus.jsx";
import ViewContacts from "../../ViewContacts";
import RenewalsExpirations from "./Components/Procurements/RenewalsExpirations.jsx";
// import PurchaseOrderEdit from "./Components/PurchaseOrderEdit";
import ViewPurchaseOrder from "./Components/ViewPurchaseOrder";
import PurchaseOrderList from "./Components/Procurements/PurchaseOrderList.jsx";
import EditPurchaseOrder from "./Components/EditPurchaseOrder";
import RegistrationRequest from "./Components/Vendor/RegistrationRequest";
import ComplianceVerification from "./Components/Vendor/ComplianceVerification";
import AutoFillPurchaseOrder from "./Components/AutoFillPurchaseOrder";
import SystemSettings from "./Components/Settings/SystemSettings";
import MusicClick from "./testing/MusicClick.jsx";
import RequestList from "./Components/RequestList.jsx";
import VendorManagement from "./Components/Procurements/VendorManagement.jsx";
import Empty from "./Components/Empty.jsx";
import VendorProduct from "./Components/VendorProduct.jsx";
import VendorManagementCreate from "./Components/VendorManagementCreate.jsx";
import Profile from "./Components/Profile.jsx";
import WareHouse from "./Components/WareHouse.jsx";
import VendorManagementAll from "./Components/Procurements/VendorManagementAll.jsx";
import InvoiceItems from "./Components/Procurements/InvoiceItems.jsx";
import InvoiceAll from "./Components/Procurements/InvoiceAll.jsx";
import PendingInvoice from "./Components/Procurements/PendingInvoice.jsx";
import CompleteInvoice from "./Components/Procurements/CompleteInvoice.jsx";
import TrackOrder from "./Components/Procurements/TrackOrder.jsx";
import TrackOrderPending from "./Components/Procurements/TrackOrderPending.jsx";

const App = () => {
  const { token, apiURL, setToken } = useContext(UserContext); // Get token from context
  const navigate = useNavigate();
  const location = useLocation();
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const { userData, fetchUserData, allUsers } = Store(); // Access global state and actions

  useEffect(() => {
    console.log(allUsers);
    const verifyToken = async () => {
      const storedtoken = localStorage.getItem("token");

      if (!storedtoken && location.pathname !== "/login") {
        navigate("/login");
      } else {
        try {
          const response = await axios.post(`${apiURL}/api/verifyToken`, {
            token: storedtoken,
          });

          if (response.data.valid) {
            setIsTokenVerified(true);
          } else {
            handleInvalidToken();
          }
        } catch (error) {
          handleInvalidToken();
          navigate("/login");
        }
      }
    };
    // again
    const handleInvalidToken = () => {
      localStorage.removeItem("token");
      setToken(null);
    };

    verifyToken();
    if (!userData) {
      fetchUserData();
    }
    console.log(userData);
  }, [navigate, location.pathname, setToken, fetchUserData]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    // If no token and not on login page, redirect to login
    if (!storedToken && location.pathname !== "/login") {
      navigate("/login");
    } else {
      setIsTokenVerified(true); // Token is valid, allow access
    }
  }, [navigate, location.pathname]);

  // Show loading while verifying token
  if (!isTokenVerified) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Check if user is on the login page and already has a token
  if (token && location.pathname === "/login") {
    navigate("/"); // Redirect to dashboard or homepage if already logged in
  }

  // Define routes that should be rendered
  return (
    <div className="flex min-h-screen" data-theme="light">
      <ToastContainer />

      {!token && location.pathname === "/login" ? null : <Sidebar />}
      <div className="flex-col w-full ">
        {!token && location.pathname === "/login" ? null : <Search />}
        <Routes>
          <Route path="/music" element={<MusicClick />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/rawmaterialrequest" element={<RawMaterialRequest />} />
          <Route path="/supplierlist" element={<SupplierList />} />

          <Route path="/login" element={<Log />} />
          <Route path="/user" element={<User />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route path="/user/createuser" element={<CreateUser />} />
          <Route path="/suppliers" element={<CreateSupplier />} />
          <Route path="/suppliers" element={<CreateSupplier />} />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route
            path="/createpurchaseorder"
            element={<CreatePurchaseOrder />}
          />
          <Route
            path="/orderfulfillmentstatus"
            element={<OrderFulfillmentStatus />}
          />
          <Route path="/viewcontacts" element={<ViewContacts />} />
          <Route
            path="/renewalsexpirations"
            element={<RenewalsExpirations />}
          />
          <Route
            path="/purchase-order/edit"
            element={<AutoFillPurchaseOrder />}
          />
          <Route
            path="/purchase_orders/view_po/:id"
            element={<ViewPurchaseOrder />}
          />
          <Route path="/purchaseorderlist" element={<PurchaseOrderList />} />
          <Route
            path="/purchase_orders/manage_po/:id"
            element={<EditPurchaseOrder />}
          />
          <Route
            path="/registrationrequest"
            element={<RegistrationRequest />}
          />
          <Route
            path="/complianceverification"
            element={<ComplianceVerification />}
          />

          {/* Currencies */}
          <Route path="/currencies" element={<ComplianceVerification />} />

          {/* System Settings */}
          <Route path="/system_settings" element={<SystemSettings />} />

          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<MobileSidebar />} />

          {/* 3 Cards of Vendor Management */}
          <Route path="/vendormanagement" element={<VendorManagementAll />} />
          <Route
            path="/vendormanagementcreate"
            element={<VendorManagementCreate />}
          />
          <Route path="/vendorproduct" element={<VendorProduct />} />
          <Route path="/empty" element={<Empty />} />
          {/* </Route> */}
          <Route path="/profile" element={<Profile />}></Route>

          {/* WAREHOUSE */}
          <Route path="/warehouse" element={<WareHouse />} />
          <Route path="/invoice" element={<InvoiceItems />} />
          <Route path="/invoice/all" element={<InvoiceAll />} />
          <Route path="/invoice/pending" element={<PendingInvoice />} />
          <Route path="/invoice/complete" element={<CompleteInvoice />} />

          <Route path="/trackorders" element={<TrackOrder />} />
          <Route path="/trackorders/pendings" element={<TrackOrderPending />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;

import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import Log from "./Components/Authentication/Log";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";
import RawMaterialRequest from "./Components/Procurement/RawMaterialRequest";
import SupplierList from "./Components/Procurement/SupplierList";
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
import CreatePurchaseOrder from "./Components/Procurement/CreatePurchaseOrder";
import TrackOrders from "./Components/Procurement/TrackOrders";
import OrderFulfillmentStatus from "./Components/Procurement/OrderFulfillmentStatus";
import ViewContacts from "../../ViewContacts";
import RenewalsExpirations from "./Components/Procurement/RenewalsExpirations";
// import PurchaseOrderEdit from "./Components/PurchaseOrderEdit";
import ViewPurchaseOrder from "./Components/ViewPurchaseOrder";
import PurchaseOrderList from "./Components/Procurement/PurchaseOrderList";
import EditPurchaseOrder from "./Components/EditPurchaseOrder";
import RegistrationRequest from "./Components/Vendor/RegistrationRequest";
import ComplianceVerification from "./Components/Vendor/ComplianceVerification";
import AutoFillPurchaseOrder from "./Components/AutoFillPurchaseOrder";

const App = () => {
  const { token, apiURL, setToken } = useContext(UserContext); // Get token from context
  const navigate = useNavigate();
  const location = useLocation();
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const { userData, fetchUserData } = Store(); // Access global state and actions

  useEffect(() => {
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
          <Route path="/" element={<Dashboard />} />
          <Route path="/rawmaterialrequest" element={<RawMaterialRequest />} />
          <Route path="/supplierlist" element={<SupplierList />} />

          <Route path="/login" element={<Log />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/createuser" element={<CreateUser />} />
          <Route path="/suppliers" element={<CreateSupplier />} />
          <Route
            path="/suppliers/createsupplier"
            element={<CreateSupplier />}
          />
          <Route path="/user/edit/:id" element={<EditUser />} />
          <Route
            path="/createpurchaseorder"
            element={<CreatePurchaseOrder />}
          />
          <Route path="/trackorders" element={<TrackOrders />} />
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

          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<MobileSidebar />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import SendEmail from "./Authentication/SendEmail";
import SidebarVendor from "./Components/SidebarVendor";
import DashboardVendor from "./Modules/DashboardVendor";
import NavbarVendor from "./Components/NavbarVendor";
import OrdersVendor from "./Modules/OrdersVendor";
import InvetoryManagement from "./Modules/InvetoryManagement";
import ShipmentVendor from "./Components/ShipmentVendor";
import InvoicesVendor from "./Modules/InvoicesVendor";
import CommunicationVendor from "./Modules/CommunicationVendor";
import AccountManagementVendor from "./Modules/AccountManagementVendor";
import Verify from "./pages/Verify";
import PendingOrdersVendor from "./Modules/PendingOrdersVendor";
import CompleteOrdersVendor from "./Modules/CompleteOrdersVendor";
import ReceivingOrdersVendor from "./Modules/ReceivingOrdersVendor";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verifyStore from "./context/verifyStore";
import { apiURL } from "./context/verifyStore";
import axios from "axios";
import { useContext } from "react";
import { VendorUserContext } from "./context/VendorUserContext";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(VendorUserContext);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const { fetchUserData, userData } = verifyStore();

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        // Check if the token is valid
        try {
          const response = await axios.post(`${apiURL}/api/verifyToken`, {
            token: storedToken,
          });
          if (response.data.valid) {
            setIsTokenVerified(true);

            // If token is valid and user is trying to access login or sendemail, redirect to dashboard
            if (
              location.pathname === "/login" ||
              location.pathname === "/sendemail"
            ) {
              navigate("/dashboardvendor"); // Redirect to dashboard or other route
            }
          } else {
            handleInvalidToken();
          }
        } catch (error) {
          handleInvalidToken();
          toast.error(error.message);
        }
      } else {
        // Allow access to login or sendemail if there's no token
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/sendemail"
        ) {
          navigate("/login"); // Redirect to login if not on login/sendemail and no token exists
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
  }, [navigate, location.pathname, setToken, fetchUserData]);


  console.log(userData)
  if (!isTokenVerified && localStorage.getItem("token")) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <ToastContainer />
      {location.pathname !== "/login" &&
      location.pathname !== "/verify" &&
      location.pathname !== "/sendemail" ? (
        <SidebarVendor />
      ) : null}
      <div className="flex-col flex-grow">
        {location.pathname !== "/login" &&
        location.pathname !== "/verify" &&
        location.pathname !== "/sendemail" ? (
          <NavbarVendor />
        ) : null}
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/ordersvendor" element={<OrdersVendor />}>
              <Route index element={<PendingOrdersVendor />} />
              <Route
                path="PendingOrdersVendor"
                element={<PendingOrdersVendor />}
              />
              <Route
                path="ReceivingOrdersVendor"
                element={<ReceivingOrdersVendor />}
              />
              <Route
                path="CompleteOrdersVendor"
                element={<CompleteOrdersVendor />}
              />
            </Route>
            <Route path="/dashboardvendor" element={<DashboardVendor />} />
            <Route
              path="/inventorymanagement"
              element={<InvetoryManagement />}
            />
            <Route path="/shipmentvendor" element={<ShipmentVendor />} />
            <Route path="/invoicesvendor" element={<InvoicesVendor />} />
            <Route
              path="/communicationvendor"
              element={<CommunicationVendor />}
            />
            <Route
              path="/accountmanagementvendor"
              element={<AccountManagementVendor />}
            />
            <Route path="/verify/:email" element={<Verify />} />
            <Route path="/sendemail" element={<SendEmail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

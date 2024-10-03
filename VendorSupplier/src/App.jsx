import { Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import verifyStore from "./context/verifyStore";
import { apiURL } from "./context/verifyStore";
import axios from "axios";
import { useContext } from "react";
import { VendorUserContext } from "./context/vendorUserContext";
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // const { setToken } = useContext(VendorUserContext);
  // const [isTokenVerified, setIsTokenVerified] = false;
  // const hideNavAndSider = location.pathname === "/verify";

  useEffect(() => {
    console.log(apiURL);
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken && location.pathname !== "/login") {
        navigate("/login");
      } else {
        try {
          const response = await axios.post(`${apiURL}/api/verifyToken`, {
            token: storedToken,
          });

          if (response.data.valid) {
            // setIsTokenVerified(true);
          } else {
            // handleInvalidToken();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    // const handleInvalidToken = () => {
    //   localStorage.removeItem("token");
    //   setToken(null);
    // };
    verifyToken();
  }, []);

  // Show loading while verifying token
  // if (!isTokenVerified) {
  //   return (
  //     <div className="flex items-center justify-center min-h-screen">
  //       <p>Loading...</p>
  //     </div>
  //   );
  // }

  return (
    <div className="flex">
      <ToastContainer />
      {/* {!hideNavAndSider && <SidebarVendor />} */}
      {location.pathname === "/login" ||
      location.pathname === "/verify" ? null : (
        <SidebarVendor />
      )}
      <div className="flex-col flex-grow">
        {/* {!hideNavAndSider && <NavbarVendor />} */}
        {location.pathname === "/login" ||
        location.pathname === "/verify" ? null : (
          <NavbarVendor />
        )}

        <div className="flex-grow">
          <Routes>
            {}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sendemail" element={<SendEmail />} />
            <Route path="/dashboardvendor" element={<DashboardVendor />} />
            <Route path="/ordersvendor" element={<OrdersVendor />} />
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
            <Route
              path="/pendingordersvendor"
              element={<PendingOrdersVendor />}
            />
            <Route
              path="/completeordersvendor"
              element={<CompleteOrdersVendor />}
            />
            <Route
              path="/receivingordersvendor"
              element={<ReceivingOrdersVendor />}
            />
            <Route path="verify?email=:id" element={<Register />} />
            <Route path="/verify" element={<Verify />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

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
import io from "socket.io-client";
import Socket from "./testing/Socket";
import CreateInvoiceVendor from "./Modules/CreateInvoiceVendor";
import CreateProduct from "./Modules/CreateProduct";
import Category from "./Modules/Category";
import Products from "./Modules/Products";
import AllProducts from "./Modules/AllProducts";
import PrintProducts from "./Modules/PrintProducts";
import DataTableTesting from "./testing/DataTableTesting.jsx";
import Adjustment from "./Components/StockAdjustment/Adjustment.jsx";
import CreateAdjustment from "./Components/StockAdjustment/CreateAdjustment.jsx";
import EditAdjustment from "./Components/StockAdjustment/EditAdjustment.jsx";
import EditProducts from "./Modules/EditProducts.jsx";
import AllTrackingOrders from "./Components/TrackingOrders/AllTrackingOrders.jsx";
import OrderDetailPage from "./Components/TrackingOrders/OrderDetailPage.jsx";
import CreateInvoice from "./Components/Invoice/CreateInvoice.jsx";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useContext(VendorUserContext);
  const [isTokenVerified, setIsTokenVerified] = useState(false);
  const { fetchUserData, userData } = verifyStore();

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("token");

      // Allow access to the verify route without checking the token
      if (location.pathname === "/verify") {
        return;
      }

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
          console.log(error?.response.data.message);

          console.log(error.message);
        }
      } else {
        // Allow access to login or sendemail if there's no token
        if (
          location.pathname !== "/login" &&
          location.pathname !== "/sendemail" &&
          location.pathname !== "/verify"
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

  console.log(userData);
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

            {/* Orders */}
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

            {/* Products */}
            <Route path="/createproduct" element={<CreateProduct />}>
              <Route path="category" element={<Category />} />
              <Route path="products" element={<Products />} />
              <Route path="allproducts" element={<AllProducts />} />
              <Route path="printproducts" element={<PrintProducts />} />
            </Route>
            <Route path="/products/:id/edit" element={<EditProducts />} />

            <Route path="/dashboardvendor" element={<DashboardVendor />} />

            <Route
              path="/inventorymanagement"
              element={<InvetoryManagement />}
            />

            <Route path="/shipmentvendor" element={<ShipmentVendor />} />
            <Route
              path="/communicationvendor"
              element={<CommunicationVendor />}
            />
            <Route
              path="/accountmanagementvendor"
              element={<AccountManagementVendor />}
            />
            <Route path="/verify" element={<Verify />} />
            <Route path="/sendemail" element={<SendEmail />} />
            <Route path="/socketTest" element={<Socket />} />

            {/* INVOICE */}
            <Route
              path="/createinvoicevendor/:orderId"
              element={<CreateInvoiceVendor />}
            />
            <Route path="/invoicesvendor" element={<InvoicesVendor />} />
            <Route path="/createInvoice" element={<CreateInvoice />} />
            {/* END */}

            <Route path="/datatable" element={<DataTableTesting />} />
            <Route path="/adjustments" element={<Adjustment />} />
            <Route path="/adjustments/create" element={<CreateAdjustment />} />
            <Route path="/adjustments/:id/edit" element={<EditAdjustment />} />
            <Route path="/trackingOrders" element={<AllTrackingOrders />} />
            <Route
              path="/order-details/:orderId"
              element={<OrderDetailPage />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;

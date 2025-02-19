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
import FulFillOrders from "./Components/FulFillOrders.jsx";
import Dispatches from "./Components/Dispatches.jsx";
import Report from "./Components/Report.jsx";
import Receiving from "./Components/Receiving.jsx";
import QCInspection from "./Components/QualityControl/QCInspection..jsx";
import DiscrepancyReport from "./Components/ReturnManagement/DiscrepancyReport.jsx";
import GCashPaymentForm from "./Components/Testing/GCashPaymentForm.jsx";
import PaymentLinks from "./Components/Testing/PaymentLinks.jsx";
import PaymentAllList from "./Components/Payment/PaymentAllList.jsx";
import ViewDetails from "./Components/Payment/ViewDetails.jsx";
import Messages from "./Components/Message/Messages.jsx";
import TestingCrypto from "./testing/TestingCrypto.jsx";
import TensorFlowExample from "./testing/TensorFlow.jsx";
import DiscrepancyDetection from "./Components/Warehouse/DiscrepancyDetection.jsx";
import AuditLog from "./Components/Audit_Management/AuditLog.jsx";
import TrackingOrderReceiving from "./Components/TrackingOrders/TrackingOrderReceiving.jsx";
import Bidding from "./Components/Bidding/Bidding.jsx";
import Category from "./Components/Category/Category.jsx";

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
          const response = await axios.post(
            `${apiURL}/api/verifyToken`,
            {},
            {
              headers: { Authorization: `Bearer ${storedtoken}` },
            }
          );

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
          {/* GCash */}
          <Route path="/paymentform" element={<GCashPaymentForm />} />
          <Route path="/paymentlinks" element={<PaymentLinks />} />

          {/* PAYMENT LIST */}
          <Route path="/paymentList" element={<PaymentAllList />} />
          <Route path="/payment-details/:id" element={<ViewDetails />} />

          <Route path="/music" element={<MusicClick />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/rawmaterialrequest" element={<RawMaterialRequest />} />

          {/* USER */}
          <Route path="/login" element={<Log />} />
          <Route path="/user" element={<User />} />
          <Route path="/requestlist" element={<RequestList />} />
          <Route path="/user/createuser" element={<CreateUser />} />

          {/* SUPPLIER */}
          <Route path="/supplierlist" element={<SupplierList />} />
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

          {/* INVOICE */}
          <Route path="/invoice" element={<InvoiceItems />} />
          <Route path="/invoice/all" element={<InvoiceAll />} />
          <Route path="/invoice/pending" element={<PendingInvoice />} />
          <Route path="/invoice/complete" element={<CompleteInvoice />} />

          {/* TRACKING ORDER */}
          <Route path="/trackorders" element={<TrackOrder />} />
          <Route
            path="/trackorders/discrepancy_detection"
            element={<DiscrepancyDetection />}
          />
          <Route path="/trackorders/pendings" element={<TrackOrderPending />} />

          {/* WAREHOUSE */}
          <Route path="/warehouse" element={<WareHouse />} />
          <Route path="/fulfillorders" element={<FulFillOrders />} />
          <Route path="/dispatches" element={<Dispatches />} />
          <Route path="/report" element={<Report />} />
          <Route path="/receiving" element={<Receiving />} />
          <Route
            path="/quality-control/:invoiceId"
            element={<QCInspection />}
          />
          <Route path="/testingDecryptData" element={<TestingCrypto />} />

          {/* Return management */}
          <Route path="/discrepancy_report" element={<DiscrepancyReport />} />
          <Route path="/tensorFlow" element={<TensorFlowExample />} />
          <Route path="/auditLog-logistic" element={<AuditLog />} />
          <Route
            path="/trackingOrder/detail/:id"
            element={<TrackingOrderReceiving />}
          ></Route>
          <Route path="/bidding-category" element={<Category />}></Route>
          <Route path="/bidding" element={<Bidding />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

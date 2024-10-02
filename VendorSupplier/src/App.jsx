import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SidebarVendor/>
        <div className="flex-col flex-grow">
          <NavbarVendor />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/sendemail" element={<SendEmail />} />
              <Route path="/dashboardvendor" element={<DashboardVendor />} />
              <Route path="/ordersvendor" element={<OrdersVendor />} />
              <Route path="/inventorymanagement" element={<InvetoryManagement />} />
              <Route path="/shipmentvendor" element={<ShipmentVendor />} />
              <Route path="/invoicesvendor" element={<InvoicesVendor />} />
              <Route path="/communicationvendor" element={<CommunicationVendor />} />
              <Route path="/accountmanagementvendor" element={<AccountManagementVendor />} />
              <Route path="/pendingordersvendor" element={<PendingOrdersVendor />} />
              <Route path="verify?email=:id" element={<Register/>}> </Route>
              <Route path="/verify" element={<Verify />} />

              {/* Add more vendor routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

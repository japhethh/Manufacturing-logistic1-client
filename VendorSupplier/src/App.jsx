import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import SendEmail from "./Authentication/SendEmail";
import SidebarVendor from "./Components/SidebarVendor";
import DashboardVendor from "./Modules/DashboardVendor";
import NavbarVendor from "./Components/NavbarVendor";
import OrdersVendor from "./Modules/OrdersVendor";

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
              {/* Add more vendor routes here */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;

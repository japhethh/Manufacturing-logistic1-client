import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import Dashboard from "./pages/Dashboard";
import Log from "./Components/Authentication/Log";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";
import RawMaterialRequest from "./Components/RawMaterialRequest";
import PurchaseOrder from "./Components/PurchaseOrder";
import SupplierList from "./Components/SupplierList";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import MobileSidebar from "./Components/MobileSidebar";
import Store from "./context/store";
import User from "./Components/User";
import CreateUser from "./Components/CreateUser";
import CreateSupplier from "./Components/CreateSupplier";

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
      <div className="flex-col w-full">
        {!token && location.pathname === "/login" ? null : <Search />}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/rawmaterialrequest" element={<RawMaterialRequest />} />
          <Route path="/supplierlist" element={<SupplierList />} />
          <Route path="/purchaseorder" element={<PurchaseOrder />} />
          <Route path="/login" element={<Log />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/createuser" element={<CreateUser />} />
          <Route path="/suppliers" element={<CreateSupplier />} />
          <Route path="/suppliers/createsupplier" element={<CreateSupplier />} />
    
          <Route path="*" element={<NotFound />} />
          <Route path="*" element={<MobileSidebar />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

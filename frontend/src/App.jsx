import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./Components/Authentication/Register";
import Log from "./Components/Authentication/Log";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import Sidebar from "./Components/Sidebar";
import Search from "./Components/Search";
import Orderhistory from "./Components/Orderhistory";
import PurchaseOrder from "./Components/PurchaseOrder";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./pages/NotFound";

const App = () => {
  const { token } = useContext(UserContext); // Get the token from context
  const navigate = useNavigate();
  const location = useLocation();

  // State to control if we're still verifying token
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  useEffect(() => {
    const verifyToken = () => {
      const storedToken = localStorage.getItem("token");

      if (
        !storedToken &&
        location.pathname !== "/login" &&
        location.pathname !== "/register"
      ) {
        navigate("/login");
      } else {
        setIsTokenVerified(true);
      }
    };

    verifyToken();
  }, [navigate, location.pathname]);

  // If token verification is not complete, show a loading screen
  if (!isTokenVerified) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // Check if the current route is login, register
  const isAuthPage =
    location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className={`flex min-h-screen`} data-theme="light">
      <ToastContainer />

      {/* Only render Sidebar and Search if not on login/register routes */}
      {!isAuthPage && location.pathname !== "*" &&   <Sidebar />}
      <div className="flex-col w-full">
        {!isAuthPage && location.pathname !== "*" && <Search />}

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orderhistory" element={<Orderhistory />} />
          <Route path="/purchaseorder" element={<PurchaseOrder />} />
          <Route path="/login" element={<Log />} />
          <Route path="/register" element={<Register />} />
          
          {/* Explicitly handle NotFound */}
          <Route path="*" element={<NotFoundWrapper />} />
        </Routes>
      </div>
    </div>
  );
};

const NotFoundWrapper = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <NotFound />
    </div>
  );
};

export default App;

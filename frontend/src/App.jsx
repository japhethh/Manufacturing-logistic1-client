import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./Components/Authentication/Register";
import Log from "./Components/Authentication/Log";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import Sidebar from './Components/Sidebar'
import Search from "./Components/Search";
import Orderhistory from "./Components/Orderhistory";
import PurchaseOrder from "./Components/PurchaseOrder";
const App = () => {
  const context = useContext(UserContext);
  const { token, setToken, apiURL } = context;
  if (!context) {
    return null;
  }
  useEffect(() => {
    console.log(apiURL);
    console.log(token);
  }, []);

  return (
    <div className="flex" data-theme="light">
      <Sidebar />
      <div className="flex-col w-full">
        <Search/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="orderhistory" element={<Orderhistory/>}/>
          <Route path="purchaseorder" element={<PurchaseOrder/>}/>
          <Route path="/login" element={<Log />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Authentication/Register";
import Log from "./Components/Authentication/Log";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
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
      <div className="flex-col w-full">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/log" element={<Log />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Register from "./Components/Authentication/Register";
import Log from "./Components/Authentication/Log";
import { useEffect } from "react";
const App = () => {


  useEffect(() => {
    
  },[])

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

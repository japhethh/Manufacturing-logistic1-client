import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import SendEmail from './Authentication/SendEmail';
import SidebarVendor from './Components/SidebarVendor';
import DashboardVendor from './Components/DashboardVendor';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sendemail" element={<SendEmail />} />
        <Route path="/sidebarvendor" element={<SidebarVendor />} />
        <Route path="/dashboardvendor" element={<DashboardVendor />} />


      </Routes>
    </Router>
  );
};

export default App;

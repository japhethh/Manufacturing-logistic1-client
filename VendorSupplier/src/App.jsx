import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import SendEmail from './Authentication/SendEmail';
import SidebarVendor from './Components/SidebarVendor';
import DashboardVendor from './Components/DashboardVendor';

const App = () => {
  return (
    <Router>
      <div className="flex">
        <SidebarVendor />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sendemail" element={<SendEmail />} />
            <Route path="/dashboardvendor" element={<DashboardVendor />} />
            {/* Add more vendor routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

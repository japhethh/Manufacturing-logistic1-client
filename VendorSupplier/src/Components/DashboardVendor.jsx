import React from 'react';
import { Link } from 'react-router-dom'; // Import if you're using React Router for navigation
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data for charts
const lineData = [
  { name: 'Jan', vendors: 10 },
  { name: 'Feb', vendors: 15 },
  { name: 'Mar', vendors: 20 },
  { name: 'Apr', vendors: 25 },
  { name: 'May', vendors: 30 },
];

const pieData = [
  { name: 'Active', value: 60 },
  { name: 'Inactive', value: 30 },
  { name: 'Pending', value: 10 },
];

const COLORS = ['#4F46E5', '#60A5FA', '#FBBF24'];

const DashboardVendor = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Vendor Supplier Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Total Vendors</h2>
          <p className="text-3xl font-bold text-blue-600">50</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Pending Registrations</h2>
          <p className="text-3xl font-bold text-blue-600">10</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Active Contracts</h2>
          <p className="text-3xl font-bold text-blue-600">30</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Recent Communications</h2>
          <ul className="mt-2">
            <li>
              <Link to="/vendor/communication/1" className="text-blue-500 hover:underline">
                Vendor A - Follow-up
              </Link>
            </li>
            <li>
              <Link to="/vendor/communication/2" className="text-blue-500 hover:underline">
                Vendor B - Quote Request
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Inventory Status</h2>
          <p className="text-3xl font-bold text-blue-600">20 Items Low</p>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h2 className="text-xl font-semibold text-gray-700">Payments Due</h2>
          <p className="text-3xl font-bold text-blue-600">$5000</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendors Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="vendors" stroke="#4F46E5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Vendor Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200">
          Add New Vendor
        </button>
      </div>
    </div>
  );
};

export default DashboardVendor;

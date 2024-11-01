import { Link } from 'react-router-dom';
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
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-10 text-gray-800">Vendor Supplier Dashboard</h1>
      
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Total Vendors', value: '50', color: 'text-blue-600' },
          { title: 'Pending Registrations', value: '10', color: 'text-yellow-600' },
          { title: 'Active Contracts', value: '30', color: 'text-green-600' },
          { title: 'Recent Communications', content: (
              <ul className="mt-3 space-y-1">
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
            ) 
          },
          { title: 'Inventory Status', value: '20 Items Low', color: 'text-red-600' },
          { title: 'Payments Due', value: '$5000', color: 'text-purple-600' },
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-800">{card.title}</h2>
            {card.value ? <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p> : card.content}
          </div>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Vendors Over Time</h2>
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
        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">Vendor Status Distribution</h2>
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
      
      {/* Add New Vendor Button */}
      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200">
          Add New Vendor
        </button>
      </div>
    </div>
  );
};

export default DashboardVendor;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { apiURL } from "../context/verifyStore";
import { currency } from "../context/Currency";
import verifyStore from "../context/verifyStore";

const DashboardVendor = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearData, setYearData] = useState({ totalRevenue: 0, totalSales: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = verifyStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [monthlyRes, yearlyRes] = await Promise.all([
          axios.get(`${apiURL}/api/salesAndRevenue/monthly-sales-revenue`, {
            headers: { token },
          }),
          axios.get(`${apiURL}/api/salesAndRevenue/yearly-sales-revenue`, {
            headers: { token },
          }),
        ]);

        setMonthlyData(monthlyRes.data || []);
        setYearData(yearlyRes.data || { totalRevenue: 0, totalSales: 0 });
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const formattedData = useMemo(
    () =>
      monthlyData.map(({ month, totalRevenue, totalSales }) => ({
        name: month,
        revenue: totalRevenue,
        sales: totalSales,
      })),
    [monthlyData]
  );

  const cards = [
    {
      title: "Total Sales (This Year)",
      value: `${currency[0]} ${yearData?.totalSales}`,
      color: "text-blue-600",
    },
    {
      title: "Total Revenue (This Year)",
      value: `${currency[0]} ${yearData?.totalRevenue}`,
      color: "text-yellow-600",
    },
    { title: "Active Contracts", value: "30", color: "text-green-600" },
    {
      title: "Inventory Status",
      value: "20 Items Low",
      color: "text-red-600",
    },
    { title: "Payments Due", value: "₱5000", color: "text-purple-600" },
  ];

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Vendor Supplier Dashboard
      </h1>

      {/* Loading & Error Handling */}
      {loading && (
        <div className="text-center text-gray-600 text-lg">Loading data...</div>
      )}
      {error && (
        <div className="text-center text-red-600 font-semibold">{error}</div>
      )}

      {/* Cards Section */}
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card key={index} title={card.title} value={card.value} color={card.color} />
          ))}
        </div>
      )}

      {/* Line Chart for Sales and Revenue */}
      {!loading && !error && (
        <div className="mt-10 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">
            Monthly Sales and Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="sales" stroke="#4F46E5" name="Sales" />
              <Line type="monotone" dataKey="revenue" stroke="#FBBF24" name="Revenue" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Actions */}
      {!loading && !error && (
        <div className="mt-10 text-center">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200">
            Add New Vendor
          </button>
        </div>
      )}
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
    <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    <p className={`text-4xl font-bold ${color}`}>{value}</p>
  </div>
);

export default DashboardVendor;

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../context/verifyStore";
import { currency } from "../context/Currency";
import verifyStore from "../context/verifyStore";

const DashboardVendor = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearData, setYearData] = useState({ totalRevenue: 0, totalSales: 0 });
  const { token } = verifyStore();
  const formattedData = monthlyData.map(
    ({ month, totalRevenue, totalSales }) => ({
      name: month,
      revenue: totalRevenue,
      sales: totalSales,
    })
  );

  useEffect(() => {
    fetchMonthlyData();
    fetchYearData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/salesAndRevenue/monthly-sales-revenue`,
        { headers: { token: token } }
      );
      setMonthlyData(response.data || []);
    } catch (error) {
      console.error(
        "Error fetching monthly data:",
        error?.response?.data?.message
      );
    }
  };

  const fetchYearData = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/salesAndRevenue/yearly-sales-revenue`,
        { headers: { token: token } }
      );
      setYearData(response.data || { totalRevenue: 0, totalSales: 0 });
    } catch (error) {
      console.error(
        "Error fetching yearly data:",
        error?.response?.data?.message
      );
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "Total Sales (This Year)",
            value: `${currency[0]} ${yearData?.totalSales} `,
            color: "text-blue-600",
          },
          {
            title: "Total Revenue (This Year)",
            value: `${currency[0]} ${yearData?.totalRevenue} `,
            color: "text-yellow-600",
          },
          { title: "Active Contracts", value: "30", color: "text-green-600" },

          {
            title: "Inventory Status",
            value: "20 Items Low",
            color: "text-red-600",
          },
          { title: "Payments Due", value: "$5000", color: "text-purple-600" },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              {card.title}
            </h2>
            {card.value ? (
              <p className={`text-4xl font-bold ${card.color}`}>{card.value}</p>
            ) : (
              card.content
            )}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-10 text-gray-800">
        Vendor Supplier Dashboard
      </h1>

      {/* Line Chart for Sales and Revenue */}
      <div className="mt-10 bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">
          Monthly Sales and Revenue
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#4F46E5"
              name="Sales"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#FBBF24"
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Example of other sections for reference */}
      <div className="mt-10 text-center">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-500 transition duration-200">
          Add New Vendor
        </button>
      </div>
    </div>
  );
};

export default DashboardVendor;

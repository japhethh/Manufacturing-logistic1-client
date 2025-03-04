import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { RiPassPendingLine } from "react-icons/ri";
import {
  MdOutlinePeopleAlt,
  MdOutlineYoutubeSearchedFor,
} from "react-icons/md";
import { GrMoney } from "react-icons/gr";

import { MdOutlineChat } from "react-icons/md";
import { useEffect, useState } from "react";
import { FaBoxes } from "react-icons/fa";

import { UserContext } from "../context/userContext";
import { useContext } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Rectangle,
  ResponsiveContainer,
} from "recharts";
// import { BsEye } from "react-icons/bs";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
];

const Dashboard = () => {
  const [supplier, setSupplier] = useState(null);

  const { apiURL } = useContext(UserContext);
  const [historicalData, setHistoricalData] = useState([]);
  const [predictedData, setPredictedData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setSupplier(response.data);
    };
    loadData();
    console.log(supplier);
  }, []);

  useEffect(() => {
    // Fetch historical data from the '/api/demandForecastMonth' endpoint
    axios
      .get(`${apiURL}/api/demandForecastMonth`)
      .then((response) => {
        if (response.data.success) {
          setHistoricalData(response.data.month);
        }
      })
      .catch((error) =>
        console.error("Error fetching historical data:", error)
      );

    // Fetch predicted data from the '/api/demandForecast/getRawMaterial' endpoint
    axios
      .post(`${apiURL}/api/demandForecast/getRawMaterial`)
      .then((response) => {
        if (response.data.success) {
          setPredictedData(response.data.predictedDemand);
        }
      })
      .catch((error) => console.error("Error fetching predicted data:", error));
  }, []);

  // Combine the data for charting
  const combinedData = [
    ...historicalData.map((d) => ({
      ...d,
      type: "Historical",
      month: `${d._id.month}/${d._id.year}`, // Format the month/year as a string
    })),
    ...(predictedData
      ? [
          {
            month: `${new Date().getMonth() + 1}/2025`, // Predicting next month, for example
            totalQuantity: predictedData,
            type: "Predicted",
          },
        ]
      : []),
  ];

  return (
    <>
      <div className="flex flex-col w-full max-w-6xl mx-auto px-4 py-6">
        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-800 font-Roboto mb-5">
            Overview
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-4">
            {/* Card Component */}
            {[
              {
                title: "Total Suppliers",
                value: supplier?.length,
                icon: <FaBoxes />,
                change: "10.8%",
                amount: "+₱128.58",
                color: "green",
              },
              {
                title: "Revenue",
                value: "₱537.83",
                icon: <HiOutlineCurrencyDollar />,
                change: "10.8%",
                amount: "+₱128.58",
                color: "green",
              },
              {
                title: "Sales",
                value: "4859",
                icon: <GrMoney />,
                change: "18.2%",
                amount: "+47",
                color: "green",
              },
              {
                title: "Customers",
                value: "2235",
                icon: <MdOutlinePeopleAlt />,
                change: "12.4%",
                amount: "-215",
                color: "red",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-5 transition-all duration-300 hover:scale-105 hover:bg-gray-100"
              >
                <div className="flex items-center justify-between">
                  <p className="text-black/80 font-bold text-lg font-Roboto">
                    {card.title}
                  </p>
                  <div className="text-gray-700 text-2xl">{card.icon}</div>
                </div>
                <div className="flex gap-3 my-3 items-center">
                  <p className="text-4xl font-bold font-Roboto">{card.value}</p>
                  <p
                    className={`flex font-Roboto items-center gap-1 px-3 py-1 text-sm font-medium rounded-full shadow-md bg-${card.color}-100 text-${card.color}-700`}
                  >
                    {card.color === "green" ? (
                      <IoIosArrowUp />
                    ) : (
                      <IoIosArrowDown />
                    )}{" "}
                    {card.change}
                  </p>
                </div>
                <p className={`text-${card.color}-700 font-medium`}>
                  {card.amount}{" "}
                  <span className="text-black/80 font-Roboto font-medium">
                    than past week
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Demand Forecasting Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-black/80 font-Roboto mb-4">
            Demand Forecast Dashboard
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalQuantity"
                stroke="#8884d8"
                name="Historical Data"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="totalQuantity"
                stroke="#ff7300"
                name="Predicted Data"
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

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
      <div className="flex">
        <div className="flex-col w-full container-md mx-auto">
          {/* <iframe
            src="https://roadmap.sh/r/embed?id=66e5f53cf34c8868ec46b917"
            width="100%"
            height="700px"
            frameBorder="0"
          ></iframe> */}
          <div className="bg-gray-200 text-black h-auto p-5">
            {/* 5 cards */}
            <p className="font-semibold">Overview</p>
            {/* cards */}
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Suppliers Card */}
              <div className="bg-white shadow-2xl flex-1 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-3xl duration-200 hover:bg-teal-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold text-lg">
                    Totals Suppliers
                  </p>
                  <FaBoxes className="text-gray-700 text-2xl" />
                </div>
                <div className="flex gap-3 my-3 items-center">
                  <p className="text-4xl font-bold">{supplier?.length}</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold shadow-md">
                    <IoIosArrowUp className="text-green-700" /> 10.8%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +₱128.58{" "}
                    <span className="text-gray-600">than past week</span>
                  </p>
                </div>
              </div>

              {/* Revenue Card */}
              <div className="bg-white shadow-2xl flex-1 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-3xl hover:bg-teal-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold text-lg">Revenue</p>
                  <HiOutlineCurrencyDollar className="text-gray-700 text-2xl" />
                </div>
                <div className="flex gap-3 my-3 items-center">
                  <p className="text-4xl font-bold">₱537.83</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold shadow-md">
                    <IoIosArrowUp className="text-green-700" /> 10.8%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +₱128.58{" "}
                    <span className="text-gray-600">than past week</span>
                  </p>
                </div>
              </div>

              {/* Sales Card */}
              <div className="bg-white shadow-2xl flex-1 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-3xl hover:bg-teal-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold text-lg">Sales</p>
                  <GrMoney className="text-gray-700 text-2xl" />
                </div>
                <div className="flex gap-3 my-3 items-center">
                  <p className="text-4xl font-bold">4859</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold shadow-md">
                    <IoIosArrowUp className="text-green-700" /> 18.2%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +47 <span className="text-gray-600">than past week</span>
                  </p>
                </div>
              </div>

              {/* Customer Card */}
              <div className="bg-white shadow-2xl flex-1 p-6 rounded-lg transition-transform transform hover:scale-105 hover:shadow-3xl hover:bg-teal-50">
                <div className="flex items-center justify-between">
                  <p className="text-gray-700 font-semibold text-lg">
                    Customer
                  </p>
                  <MdOutlinePeopleAlt className="text-gray-700 text-2xl" />
                </div>
                <div className="flex gap-3 my-3 items-center">
                  <p className="text-4xl font-bold">2235</p>
                  <p className="flex items-center gap-1 bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm font-semibold shadow-md">
                    <IoIosArrowDown className="text-red-700" /> 12.4%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-red-700 font-semibold">
                    -215 <span className="text-gray-600">than past week</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Demand forecasting Predict */}
            <div className="dashboard-container">
              <h2 className="text-xl font-bold">Demand Forecast Dashboard</h2>

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
                    strokeDasharray="5 5" // Dashed line for predicted data
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {/* charts */}
            <div className="flex  gap-4 p-4 overflow-x-auto justify-between">
              <div className="border bg-white/70 p-2 rounded-lg flex-shrink-0 md:flex-1 shadow-lg">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 50,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </div>

              {/* Bar charts */}
              {/* w-full max-w-[430px] max-md:hidden */}
              <div className="border bg-white/70 p-2 rounded-lg flex-shrink-0  md:flex-1 shadow-lg">
                <BarChart
                  width={430}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pv"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                  <Bar
                    dataKey="uv"
                    fill="#82ca9d"
                    activeBar={<Rectangle fill="gold" stroke="purple" />}
                  />
                </BarChart>
              </div>
            </div>

            {/* 3 cards */}
            {/* <div className="flex gap-5 flex-wrap">
              <div className="mt-5 md:mt-3 lg:mt-2 bg-white rounded-xl shadow-lg">
                <div className="block">
                  <div className="w-full h-[200px]">
                    <AreaChart
                      width={window.innerWidth < 768 ? 350 : 370}
                      height={200}
                      data={data}
                      margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="uv"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                      />
                      <Area
                        type="monotone"
                        dataKey="pv"
                        stackId="1"
                        stroke="#82ca9d"
                        fill="#82ca9d"
                      />
                      <Area
                        type="monotone"
                        dataKey="amt"
                        stackId="1"
                        stroke="#ffc658"
                        fill="#ffc658"
                      />
                    </AreaChart>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

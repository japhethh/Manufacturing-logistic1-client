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

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get(`${apiURL}/api/supplier/suppliers`);
      setSupplier(response.data);
    };
    loadData();
    console.log(supplier);
  }, []);

  return (
    <>
      <div className="flex">
        <div className="flex-col w-full container-md mx-auto p-4 ">
          {/* <iframe
            src="https://roadmap.sh/r/embed?id=66e5f53cf34c8868ec46b917"
            width="100%"
            height="700px"
            frameBorder="0"
          ></iframe> */}
          <div className="bg-gray-200 text-black h-auto p-5">
            {/* 4 cards */}
            <p className="font-semibold">Overview</p>
            {/* cards */}
            <div className="flex gap-4 p-4 overflow-x-auto flex-wrap">
              {/* Suppliers Card */}
              <div className="bg-white shadow-lg w-[280px] flex-1 p-5 rounded-lg mt-3 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-semibold text-sm">
                    Totals Suppliers
                  </p>
                  <FaBoxes className="text-gray-600 text-xl" />
                </div>
                <div className="flex gap-3 my-3">
                  <p className="text-3xl font-bold">{supplier?.length}</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                    <IoIosArrowUp className="text-green-700" /> 10.8%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +$128.58{" "}
                    <span className="text-gray-500">than past week</span>
                  </p>
                </div>
              </div>
              {/* Revenue Card */}
              <div className="bg-white shadow-lg w-[280px] flex-1 p-5 rounded-lg mt-3 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-semibold text-sm">Revenue</p>
                  <HiOutlineCurrencyDollar className="text-gray-600 text-xl" />
                </div>
                <div className="flex gap-3 my-3">
                  <p className="text-3xl font-bold">$537.83</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                    <IoIosArrowUp className="text-green-700" /> 10.8%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +$128.58{" "}
                    <span className="text-gray-500">than past week</span>
                  </p>
                </div>
              </div>

              {/* Sales Card */}
              <div className="bg-white shadow-lg w-[280px] flex-1 p-5 rounded-lg mt-3 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-semibold text-sm">Sales</p>
                  <GrMoney className="text-gray-600 text-xl" />
                </div>
                <div className="flex gap-3 my-3">
                  <p className="text-3xl font-bold">4859</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                    <IoIosArrowUp className="text-green-700" /> 18.2%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +47 <span className="text-gray-500">than past week</span>
                  </p>
                </div>
              </div>

              {/* Customer Card */}
              <div className="bg-white shadow-lg w-[280px] flex-1 p-5 rounded-lg mt-3 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-semibold text-sm">
                    Customer
                  </p>
                  <MdOutlinePeopleAlt className="text-gray-600 text-xl" />
                </div>
                <div className="flex gap-3 my-3">
                  <p className="text-3xl font-bold">2235</p>
                  <p className="flex items-center gap-1 bg-red-100 text-red-700 rounded-full px-3 py-1 text-sm font-semibold">
                    <IoIosArrowDown className="text-red-700" /> 12.4%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-red-700 font-semibold">
                    -215 <span className="text-gray-500">than past week</span>
                  </p>
                </div>
              </div>

              {/* Spending Card */}
              <div className="bg-white shadow-lg w-[280px] flex-1 p-5 rounded-lg mt-3 transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <p className="text-gray-600 font-semibold text-sm">
                    Spending
                  </p>
                  <RiPassPendingLine className="text-gray-600 text-xl" />
                </div>
                <div className="flex gap-3 my-3">
                  <p className="text-3xl font-bold">$219.65</p>
                  <p className="flex items-center gap-1 bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold">
                    <IoIosArrowUp className="text-green-700" /> 9.1%
                  </p>
                </div>
                <div className="my-3">
                  <p className="text-green-700 font-semibold">
                    +$88.67{" "}
                    <span className="text-gray-500">than past week</span>
                  </p>
                </div>
              </div>
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
            <div className="flex gap-5 flex-wrap">
              {/* Recent Orders */}
              <div className="overflow-x-auto bg-white rounded-lg shadow-sm p-2.5 border border-gray-200">
                <table className="table w-full text-xs">
                  {/* Table head */}
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-1">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox"
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              document
                                .querySelectorAll(
                                  'tbody input[type="checkbox"]'
                                )
                                .forEach((checkbox) => {
                                  checkbox.checked = isChecked;
                                });
                            }}
                          />
                        </label>
                      </th>
                      <th className="text-left">Product</th>
                      <th className="text-left">Price</th>
                      <th className="text-left">Date</th>
                      <th className="text-left">Status</th>
                      <th className="text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Row 1 */}
                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="p-1">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="mask mask-squircle h-8 w-8">
                              <img
                                src="https://www.byrdie.com/thmb/2_StIwiboKhwe6WiQW3A5_PCjpc=/3000x3000/filters:no_upscale():max_bytes(150000):strip_icc()/1cfaad9e-be47-4755-8d89-9dd27eaf0095_1.3ecc0d85625d5020c4f9807b4d5e7c96-520e913cbf7448878006fb529447fed2.jpg"
                                alt="Shampoo"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">
                              Shampoo
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-gray-600">$1.99</td>
                      <td className="text-gray-500">18 Sept 2024</td>
                      <td>
                        <span className="badge bg-green-100 text-green-600 border border-green-600 rounded-full py-0.4 px-0.8 text-xs">
                          Delivered
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs">View</button>
                        <button className="btn btn-ghost btn-xs text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Row 2 */}
                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="p-1">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="mask mask-squircle h-8 w-8">
                              <img
                                src="https://plazavea.vteximg.com.br/arquivos/ids/23016863-1000-1000/imageUrl_1.jpg?v=638060295883870000"
                                alt="Perfume"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">
                              Perfume
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-gray-600">$1.99</td>
                      <td className="text-gray-500">18 Sept 2024</td>
                      <td>
                        <span className="badge bg-blue-100 text-blue-600 border border-blue-600 rounded-full py-0.4 px-0.8 text-xs">
                          On Going
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs">View</button>
                        <button className="btn btn-ghost btn-xs text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Row 3 */}
                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="p-1">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="mask mask-squircle h-8 w-8">
                              <img
                                src="https://cdn.shopify.com/s/files/1/0314/8555/8922/products/DinnerLady-NicShot-NicShot-100VG-18mg-3pk-UK_1024x1024@2x.jpg?v=1585150206"
                                alt="E-juice"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">
                              E-juice
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-gray-600">$1.59</td>
                      <td className="text-gray-500">18 Sept 2024</td>
                      <td>
                        <span className="badge bg-green-100 text-green-600 border border-green-600 rounded-full py-0.4 px-0.8 text-xs">
                          Delivered
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs">View</button>
                        <button className="btn btn-ghost btn-xs text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                    {/* Row 4 */}
                    <tr className="hover:bg-gray-50 border-b border-gray-200">
                      <td className="p-1">
                        <label>
                          <input type="checkbox" className="checkbox" />
                        </label>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="avatar">
                            <div className="mask mask-squircle h-8 w-8">
                              <img
                                src="https://i0.wp.com/www.babypromv.com/wp-content/uploads/2019/07/4e2bc5c3-077e-476a-9408-5f06ab2c73bf_1.7f26f2b8c0ccad58fc2a50bd471589f3-1.jpeg?fit=2642,2642&ssl=1"
                                alt="Lotion"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="font-medium text-gray-700">
                              Lotion
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="font-medium text-gray-600">$2.55</td>
                      <td className="text-gray-500">18 Sept 2024</td>
                      <td>
                        <span className="badge bg-red-100 text-red-600 border border-red-600 rounded-full py-0.4 px-0.8 text-xs">
                          Canceled
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-ghost btn-xs">View</button>
                        <button className="btn btn-ghost btn-xs text-red-500">
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* chat */}
              <div className="border max-md:w-full w-[300px] h-[300px] p-5 rounded-lg bg-white  shadow-lg">
                <div className="flex gap-2 items-center mb-4">
                  <MdOutlineChat className="text-lg" />
                  <p className="font-semibold">Quick Chat</p>
                </div>
                <div className="flex gap-3 items-center">
                  <img
                    src="https://i.pinimg.com/564x/30/e1/68/30e168340e36e773713698f3051cf875.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Quack</p>
                      <p className="text-sm text-gray-600">15:23</p>
                    </div>
                    <p className="text-sm text-gray-600">Hello</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <img
                    src="https://i.pinimg.com/736x/e0/68/21/e06821a26c25c59066d6a4309361bda2.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Meo</p>
                      <p className="text-sm text-gray-600">14:52</p>
                    </div>
                    <p className="text-sm text-gray-600">Hello</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <img
                    src="https://i.pinimg.com/564x/4b/fa/f2/4bfaf26416c0aef7c498e38ed1b567fb.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Lil Kitty</p>
                      <p className="text-sm text-gray-600">14:42</p>
                    </div>
                    <p className="text-sm text-gray-600">Hello</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center mt-3">
                  <img
                    src="https://i.pinimg.com/564x/78/2a/9b/782a9ba357d834585425bedc618445ce.jpg"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-lg">Mi</p>
                      <p className="text-sm text-gray-600">04:30</p>
                    </div>
                    <p className="text-sm text-gray-600">Hello</p>
                  </div>
                </div>
              </div>
              {/* Top Countries */}
              <div className="mt-5 md:mt-3 lg:mt-2 bg-white rounded-xl shadow-lg">
                {/* Chart is visible on small screens */}
                <div className="block">
                  <div className="w-full h-[200px]">
                    <AreaChart
                      width={350}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

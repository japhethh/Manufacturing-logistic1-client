import { AiOutlineShop } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";
import Store from "../../context/Store";
import { Link } from "react-router-dom";
const TrackingOrderReceiving = () => {
  const { id } = useParams();
  const { token } = Store();
  const [data, setData] = useState([]);

  console.log(data);
  useEffect(() => {
    fetchDataTrackingOrder();
  }, []);

  const fetchDataTrackingOrder = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/api/trackingOrders/getSpecificId/${id}`,
        { headers: { token: token } }
      );

      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.log(error?.response.data.messsage);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center font-Roboto">
        {/* BreadCrumbs */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li className="text-blue-600">
              <Link to="/receiving">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Receiving
              </Link>
            </li>
            <li>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg>
                Tracking Orders
              </Link>
            </li>
          </ul>
        </div>

        <div
          className="flex justify-between items-center
        px-4"
        >
          <h1 className="uppercase">
            Order Id: {data?._id} |
            <span className="text-blue-500 font-Roboto">
              {" "}
              {data?.deliveryStatus}
            </span>
          </h1>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg font-Roboto">
            Delivery Address
          </h1>

          <div className="flex flex-col text-sm text-gray-600 font-Roboto">
            <p>Express</p>
            <p>P61188PHUTNDB</p>
          </div>
        </div>

        <div className="flex justify-between ">
          <div className="text-xs w-2/6">
            <h1 className="text-gray-800 font-Roboto text-md font-semibold py-1">
              {data?.generalSettings?.companyName}
            </h1>
            <p className="text-gray-600 font-Roboto">
              +{data?.generalSettings?.companyPhone}
            </p>
            <p className="text-gray-600 font-Roboto">
              Country:
              <span className="text-xs font-semibold font-Roboto">
                {" "}
                {data?.generalSettings?.country}
              </span>
            </p>
            <p className="text-gray-600 font-Roboto">
              {data?.generalSettings?.companyAddress}
            </p>
          </div>
          <div className="w-4/6 border  border-l-gray-300 border-t-0 border-b-0 border-r-0 p-3 font-Roboto">
            <div className="relative">
              {data?.statusHistory
                ?.slice()
                .reverse()
                .map((item, index) => {
                  const isLatest = index === 0;
                  const textColor = isLatest
                    ? "text-green-700"
                    : "text-gray-600";

                  return (
                    <div
                      key={index}
                      className="flex flex-row gap-4 items-start mb-4 relative"
                    >
                      {/* Timeline Indicator */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-5 h-5 rounded-full ${
                            isLatest ? "bg-green-500" : "bg-gray-400"
                          } flex items-center justify-center`}
                        >
                          {isLatest ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : null}
                        </div>
                        {/* Line between points */}
                        {index !== data?.statusHistory?.length - 1 && (
                          <div
                            className={`w-[2px] h-full ${
                              isLatest ? "bg-green-500" : "bg-gray-400"
                            }`}
                          />
                        )}
                      </div>

                      {/* Status Data */}
                      <div className="flex md:flex-row flex-col  w-full text-sm font-Roboto">
                        <h1 className={`font-medium px-2 w-[25%] ${textColor}`}>
                          {new Date(item?.date).toLocaleDateString()}
                        </h1>
                        <div className="flex flex-col gap-2 w-[75%] mb-2">
                          <h1 className={`font-semibold text-md ${textColor}`}>
                            {item?.status}
                          </h1>
                          <h1
                            className={`font-normal ${
                              isLatest ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {item?.details}
                          </h1>
                          <h1
                            className={`font-normal ${
                              isLatest ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {item?.description}
                          </h1>
                          <h1
                            className={`font-normal ${
                              isLatest ? "text-green-600" : "text-gray-500"
                            }`}
                          >
                            {item?.location}
                          </h1>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <h1 className="flex justify-center items-center gap-1">
          <AiOutlineShop /> Hothome
        </h1>
        <button className="flex justify-center items-center gap-1 bg-blue-600 text-white font-Roboto text-xs px-2 py-1">
          <MdMessage /> Chat
        </button>
        <button className="flex justify-center items-center gap-1 bg-white border text-gray-700 font-Roboto  text-xs px-2 py-1 hover:opacity-50">
          <GiShop /> View Shop
        </button>
      </div>

      <div className="border mt-2 p-3 border-t-gray-400 border-r-0 border-b-0 border-l-0">
        <div>
          {data?.invoiceId?.items?.map((item, index) => (
            <div key={index} className="flex ">
              <div className="md:w-[10%] w-[20%]">
                <img
                  src={item?.product?.image}
                  alt=""
                  className="w-20 h-20 border p-2"
                />
              </div>
              <div className="md:w-[80%] w-[70%] flex flex-col gap-1">
                <h1 className="text-sm font-medium font-Roboto">
                  <span className="text-green-600 border border-green-600 px-2 py-1 text-xs">
                    Pre-Order
                  </span>{" "}
                  {item?.name}
                </h1>
                <h1 className="text-gray-500 text-sm font-Roboto">
                  Variation: wood set
                </h1>
                <p className="text-black font-medium text-sm font-Roboto">
                  x{item?.quantity}
                </p>
              </div>
              <div className="md:w-[10%] w-[20%] flex justify-center items-center">
                <p>
                  <span className="text-green-700 text-medium font-Roboto">
                    ₱{item?.totalPrice}{" "}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-row text-xs">
          <div className="w-3/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className=" text-gray-500 font-Roboto">Order Total</h1>
            </div>
          </div>
          <div className="w-2/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className="text-green-600 font-Roboto text-semibold text-lg">
                ₱{data?.totalAmount}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row text-xs">
          <div className="w-3/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className=" text-gray-500 font-Roboto">Payment Method</h1>
            </div>
          </div>
          <div className="w-2/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className="text-black font-Roboto text-semibold text-sm">
                {data?.invoiceId?.paymentDetails?.paymentMethod}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingOrderReceiving;

import { AiOutlineShop } from "react-icons/ai";
import { MdMessage } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../../context/Store";
import Store from "../../context/Store";

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
      <div className="flex justify-between items-center">
        {/* BreadCrumbs */}
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <a>
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
                Home
              </a>
            </li>
            <li>
              <a>
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
                Documents
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2">
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
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Add Document
              </span>
            </li>
          </ul>
        </div>

        <div
          className="flex justify-between items-center
        px-4"
        >
          <h1 className="uppercase">
            Order Id: 241223K4n9sWF |
            <span className="text-orange-500"> Order Completed</span>
          </h1>
        </div>
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-lg">Delivery Address</h1>

          <div className="flex flex-col text-sm text-gray-600">
            <p>Flass Express</p>
            <p>P61188PHUTNDB</p>
          </div>
        </div>

        <div className="flex justify-between ">
          <div className="text-xs w-2/6">
            <h1 className="text-gray-800 text-md font-semibold py-1">
              {data?.generalSettings?.companyName}
            </h1>
            <p className="text-gray-600">
              +{data?.generalSettings?.companyPhone}
            </p>
            <p className="text-gray-600">
              Country:
              <span className="text-xs font-semibold">
                {" "}
                {data?.generalSettings?.country}
              </span>
            </p>
            <p className="text-gray-600">
              {data?.generalSettings?.companyAddress}
            </p>
          </div>
          <div className="w-4/6 border  border-l-gray-300 border-t-0 border-b-0 border-r-0 p-3">
            <div className="flex flex-row gap-2 text-sm">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-green-700 font-semibold text-md">
                  Delivered
                </h1>
                <h1 className="text-green-600 font-normal ">
                  Parcel has been delivered
                </h1>
                <h1 className="text-green-600 font-normal">
                  Recipient: Adrey Locaylocay.
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm ">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-gray-700 font-semibold text-md">
                  In transit
                </h1>
                <h1 className="text-gray-600 font-normal ">
                  Parcel is out for delivery. Rider: Jose Mari De Castro
                  Magalang Mobile Number: 09850059629
                </h1>
                <h1 className="text-gray-600 font-normal"></h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-gray-600 font-normal ">
                  Your parcel has arrived at the delivery hub : Quezon
                  City,PAA_SP
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-gray-600 font-normal ">
                  Parcel has departed from sorting facility : Santa Maria,16
                  PN8-HUB_Bulacan
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-gray-700 font-semibold text-md">
                  Delivered
                </h1>
                <h1 className="text-gray-600 font-normal ">
                  Parcel has been delivered
                </h1>
                <h1 className="text-gray-600 font-normal">
                  {" "}
                  Recipient: Adrey Locaylocay.
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-2 text-sm">
              <h1 className="font-medium text-gray-800 px-2 w-[25%]">
                12/26/2024 10:38
              </h1>
              <div className="flex flex-col gap-2 w-[75%] mb-2">
                <h1 className="text-gray-700 font-semibold text-md">
                  Order placed
                </h1>
                <h1 className="text-gray-600 font-normal ">Order is placed</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <h1 className="flex justify-center items-center gap-1">
          <AiOutlineShop /> Hothome
        </h1>
        <button className="flex justify-center items-center gap-1 bg-orange-600 text-white text-xs px-2 py-1">
          <MdMessage /> Chat
        </button>
        <button className="flex justify-center items-center gap-1 bg-white border text-gray-700  text-xs px-2 py-1 hover:opacity-50">
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
                <h1 className="text-sm font-medium ">
                  <span className="text-orange-600 border border-orange-600 px-2 py-1 text-xs">
                    Pre-Order
                  </span>{" "}
                  {item?.name}
                </h1>
                <h1 className="text-gray-500 text-sm">Variation: wood set</h1>
                <p className="text-black font-medium text-sm">
                  x{item?.quantity}
                </p>
              </div>
              <div className="md:w-[10%] w-[20%] flex justify-center items-center">
                <p>
                  <span className="text-orange-700 text-medium">
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
              <h1 className=" text-gray-500">Order Total</h1>
            </div>
          </div>
          <div className="w-2/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className="text-orange-600 text-semibold text-lg">
                ₱{data?.totalAmount}
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row text-xs">
          <div className="w-3/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className=" text-gray-500">Payment Method</h1>
            </div>
          </div>
          <div className="w-2/5 flex justify-end border border-gray-100 p-2">
            <div className="flex justify-center items-center">
              <h1 className="text-black text-semibold text-sm">
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

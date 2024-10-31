import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { apiURL } from "../../context/Store";
import Store from "../../context/Store";
import axios from "axios";

const ViewDetails = () => {
  const { id } = useParams();
  const { token } = Store();
  const [retrievePayment, setRetrievePayment] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(
      `${apiURL}/api/retrievePayment/retrievePayment/${id}`
    );
    setRetrievePayment(response.data.data);
    console.log(response.data.data);
  };

  // Convert the Unix timestamp (seconds) to readable date and time
  const paidAtDate = retrievePayment?.attributes?.paid_at
    ? new Date(retrievePayment.attributes.paid_at * 1000)
    : null;

  const formattedDate = paidAtDate
    ? paidAtDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "N/A";

  const formattedTime = paidAtDate
    ? paidAtDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "N/A";

  return (
    <div className="p-5 bg-[#EDF1F5] h-screen">
      {/* BreadCrumbs */}
      <div className="breadcrumbs text-sm p-4">
        <ul>
          <li>
            <Link to="/paymentList">
              <span className="text-gray-500 font-semibold underline">
                All payments
              </span>
            </Link>
          </li>
          <li>
            <span>{retrievePayment.id}</span>
          </li>
        </ul>
      </div>

      <div className="p-4">
        <h1 className="text-2xl font-semibold">{retrievePayment.id}</h1>
      </div>
      <div className="">
        <div className="text-end p-4">
          <button className="px-3 py-2 mb-2 hover:bg-gray-200 bg-white text-gray-600 border border-gray-500 shadow-md rounded-md">
            Refund
          </button>

          {/* Body */}
          <div className="grid grid-cols-3 shadow-2xl border-t-4 border-violet-500 text-start">
            {/* First Grid */}
            <div className="flex flex-col p-5 bg-[#FFFFFF] text-[#002D16]">
              <div className="flex">
                <div className="w-[80%]">
                  <h1 className="text-xl font-semibold">Payment details</h1>
                  <div className="flex mb-5 py-1">
                    <h1>
                      Link reference
                      <span className="text-blue-500 font-semibold">
                        {retrievePayment?.attributes?.external_reference_number}
                      </span>
                    </h1>
                  </div>
                </div>
                <div className="w-[20%] px-2">
                  <h1 className="bg-[#F6FFED] border border-[#B7EB8F] text-[#52C41A] px-4 py-1 rounded-md flex justify-center items-center">
                    {retrievePayment?.attributes?.status}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between">
                <div>Gross amount</div>
                <div>₱ {retrievePayment?.attributes?.amount}</div>
              </div>
              <div className="flex justify-between">
                <div>Fees</div>
                <div>- ₱ {retrievePayment?.attributes?.fee}</div>
              </div>
              <div className="divider m-0"></div>

              <div className="flex justify-between mb-8">
                <div>Net amount</div>
                <div>₱ {retrievePayment?.attributes?.net_amount}</div>
              </div>

              <div className="flex flex-col">
                <h1>Payment description</h1>
                <h1>{retrievePayment?.attributes?.description}</h1>
              </div>
            </div>

            {/* Second Grid */}
            <div className="p-5 bg-[#FFFFFF]">
              <div className="flex flex-col gap-2 pt-3 px-3">
                <h1 className="text-base-500">GCash</h1>
                <h1 className="text-sm text-gray-500">
                  Paid on <span>{formattedDate}</span> at {formattedTime}
                </h1>
              </div>

              <div className="border-2 p-2 bg-[#FFFFFF] m-3 flex justify-center items-center border-[#74B6EE] rounded-md">
                <div className="flex gap-2">
                  <div className="flex text-blue-500 justify-center items-center text-lg">
                    <MdOutlineDateRange />
                  </div>
                  <div className="text-[#448AD9]">
                    <h1 className="text-sm">
                      You’ll receive this payment in your bank account on or
                      before{" "}
                      <span className="font-semibold">November 6, 2024</span>
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            {/* Third Grid */}
            <div className="p-5 flex flex-col gap-2 bg-[#F9FAFB]">
              <div>
                <h1 className="text-xl text-gray-700 py-2">Billing details</h1>
              </div>
              <h1 className="font-semibold text-gray-700 text-lg">
                {retrievePayment?.attributes?.billing?.name}
              </h1>

              <div className="py-1 text-gray-600">
                <div className="flex gap-2 font-semibold">
                  <span className="text-lg flex justify-center items-center">
                    <MdEmail />
                  </span>
                  {retrievePayment?.attributes?.billing?.email}
                </div>
                <div className="flex gap-2">
                  <span className="text-lg flex justify-center items-center">
                    <IoMdCall />
                  </span>
                  {retrievePayment?.attributes?.billing?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;

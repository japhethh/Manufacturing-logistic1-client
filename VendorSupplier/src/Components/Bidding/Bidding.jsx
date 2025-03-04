import React from "react";
import { FaClock, FaTag, FaUser, FaHandshake } from "react-icons/fa";

const Bidding = () => {
  // Sample bidding data
  const biddingData = [
    {
      id: 1,
      productName: "Vintage Camera",
      productImage: "https://via.placeholder.com/150",
      currentBid: 120,
      timeLeft: "2h 30m",
      bids: 15,
      category: "Photography",
    },
    {
      id: 2,
      productName: "Antique Chair",
      productImage: "https://via.placeholder.com/150",
      currentBid: 250,
      timeLeft: "1h 45m",
      bids: 8,
      category: "Furniture",
    },
    {
      id: 3,
      productName: "Rare Coin Collection",
      productImage: "https://via.placeholder.com/150",
      currentBid: 500,
      timeLeft: "4h 10m",
      bids: 22,
      category: "Collectibles",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Live Bidding
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {biddingData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item.productImage}
              alt={item.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {item.productName}
              </h2>
              <p className="text-sm text-gray-600 mb-4 flex items-center">
                <FaTag className="mr-2" />
                {item.category}
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-700">
                  <FaClock className="mr-2" />
                  <span>Time Left: {item.timeLeft}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FaHandshake className="mr-2" />
                  <span>Current Bid: ${item.currentBid}</span>
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <FaUser className="mr-2" />
                  <span>Bids: {item.bids}</span>
                </div>
              </div>
              <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center">
                <FaHandshake className="mr-2" />
                Place a Bid
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bidding;
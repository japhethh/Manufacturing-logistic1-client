import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { FaCalendarAlt, FaFileContract } from "react-icons/fa";
import { TbCurrencyPeso } from "react-icons/tb";

const apiURL = "http://localhost:7681"; // Update this to match your backend URL

const BidVendor = ({ fetchBiddingProduct }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [biddingData, setBiddingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [terms, setTerms] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [showBidModal, setShowBidModal] = useState(false);

  // Fetch bidding data and categories on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all bidding data
        const biddingResponse = await axios.get(`${apiURL}/api/bidding`);
        setBiddingData(biddingResponse.data);

        // Fetch all categories
        const categoryResponse = await axios.get(
          `${apiURL}/api/bidding/category`
        );
        setCategories([
          "All",
          ...categoryResponse.data.map((cat) => cat.category),
        ]);

        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching data:",
          error.response?.data || error.message
        );
        toast.error(
          error.response?.data?.message ||
            "Failed to fetch data. Please try again later."
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "All"
      ? biddingData
      : biddingData.filter((product) => product.category === selectedCategory);

  // Handle placing a bid
  const handlePlaceBid = async () => {
    if (!bidAmount || !terms || !deliveryDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await axios.post(`${apiURL}/api/bidding/bid`, {
        productId: selectedProduct._id,
        bidAmount: parseFloat(bidAmount),
        terms,
        deliveryTime: deliveryDate, // Ensure this matches the backend field name
      });

      if (response.data.success) {
        toast.success("Bid placed successfully!");
        setShowBidModal(false);
        setBidAmount("");
        setTerms("");
        setDeliveryDate("");

        // Refresh the bidding product list
        fetchBiddingProduct();
      } else {
        toast.error(response.data.message || "Failed to place bid.");
      }
    } catch (error) {
      console.error("Error placing bid:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Failed to place bid. Please try again later."
      );
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="flex w-full px-6 py-8 gap-6">
      {/* Categories Sidebar */}
      <div className="w-1/4 h-96 bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
        <h2 className="text-xl font-bold text-gray-900 border-b pb-3 mb-4">
          Categories
        </h2>
        <ul className="space-y-3 h-72 overflow-y-auto overflow-x-hidden">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer transition duration-200 ease-in-out transform hover:translate-x-2 whitespace-nowrap ${
                selectedCategory === category
                  ? "text-blue-600 font-bold"
                  : "text-gray-700 hover:text-blue-600"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Product Display */}
      <div className="w-3/4 bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl">
        <div className="overflow-auto h-96">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="relative flex flex-col items-start gap-4 p-6 bg-gray-50 rounded-xl shadow transition duration-300 hover:shadow-xl"
                >
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex flex-col w-full">
                    <span className="flex items-center gap-2 text-xs font-medium font-Roboto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full w-fit">
                      {new Date(product.biddingEndDate).toLocaleString()}
                    </span>
                    <h1 className="text-xl font-bold text-gray-900 mt-3">
                      {product.name}
                    </h1>
                    <span className="text-xs text-gray-700 font-medium bg-gray-200 px-2 py-1 rounded-md w-fit mt-2">
                      {product.category}
                    </span>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <button
                      className="btn bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 mt-5 w-full py-2 rounded-lg transition-all transform hover:scale-105"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full py-10">
                No products found in this category.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <dialog id="product_modal" className="modal modal-open">
          <div className="modal-box bg-white rounded-xl shadow-lg p-8 relative max-w-3xl">
            <form method="dialog">
              <button
                className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-gray-600 hover:bg-gray-200 z-10"
                onClick={() => setSelectedProduct(null)}
              >
                <IoClose className="text-2xl" />
              </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden shadow-md">
                <img
                  src={selectedProduct.productImage}
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 text-gray-800">
                <h3 className="text-3xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Category:{" "}
                  <span className="text-blue-500 font-medium">
                    {selectedProduct.category}
                  </span>
                </p>

                <div className="mt-4 space-y-3">
                  <p className="text-gray-700">
                    <strong>Starting Amount:</strong>{" "}
                    <span className="text-blue-600 font-semibold">
                      ₱{selectedProduct.startBiddingPrice}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Until:</strong>{" "}
                    <span className="text-red-500 font-medium">
                      {new Date(
                        selectedProduct.biddingEndDate
                      ).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <strong>Highest Bid:</strong>{" "}
                    <span className="text-green-500 font-semibold">
                      ₱
                      {selectedProduct.bids.length > 0
                        ? Math.max(
                            ...selectedProduct.bids.map((bid) => bid.bidAmount)
                          )
                        : "No bids yet"}
                    </span>
                  </p>
                </div>

                <p className="text-gray-500 italic mt-4">
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            <button
              className="btn bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 w-full mt-6 py-3 text-lg rounded-lg shadow-md transition-all transform hover:scale-105"
              onClick={() => setShowBidModal(true)}
            >
              Place bid
            </button>
          </div>
        </dialog>
      )}

      {/* Place Bid Modal */}
      {showBidModal && (
        <dialog id="bid_modal" className="modal modal-open">
          <div className="modal-box bg-white rounded-xl shadow-lg p-8 relative max-w-md">
            <form method="dialog">
              <button
                className="btn btn-md btn-circle btn-ghost absolute right-4 top-4 text-gray-600 hover:bg-gray-200 z-10"
                onClick={() => setShowBidModal(false)}
              >
                <IoClose className="text-2xl" />
              </button>
            </form>

            <h3 className="text-2xl font-bold text-gray-900 mb-6">Place a Bid</h3>
            <div className="space-y-4">
              {/* Bid Amount Field */}
              <div className="relative">
                <TbCurrencyPeso className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter bid amount"
                  required
                />
              </div>

              {/* Terms Field */}
              <div className="relative">
                <FaFileContract className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={terms}
                  onChange={(e) => setTerms(e.target.value)}
                  placeholder="Enter terms and conditions"
                  rows={4}
                  required
                />
              </div>

              {/* Delivery Date Field */}
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              className="btn bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold hover:from-blue-600 hover:to-blue-700 w-full mt-6 py-3 text-lg rounded-lg shadow-md transition-all transform hover:scale-105"
              onClick={handlePlaceBid}
            >
              Submit Bid
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default BidVendor;
import { NavLink } from "react-router-dom";
import { FaList, FaPlus, FaBoxOpen } from "react-icons/fa";

const BiddingItems = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Category Card */}
        <NavLink
          to="/bidding-category"
          className="w-full"
          aria-label="All Invoice"
        >
          <div className="bg-gradient-to-br from-blue-300 to-blue-500 border border-blue-400 shadow-xl rounded-xl p-8 transition-all transform hover:scale-110 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center">
              <FaList className="text-white text-3xl mr-4 drop-shadow-md transition-all" />
              <h2 className="text-white font-bold text-2xl">Category</h2>
            </div>
          </div>
        </NavLink>

        {/* Bid Create Card */}
        <NavLink to="/bidding" className="w-full" aria-label="Pending Invoice">
          <div className="bg-gradient-to-br from-cyan-300 to-cyan-500 border border-cyan-400 shadow-xl rounded-xl p-8 transition-all transform hover:scale-110 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center">
              <FaPlus className="text-white text-3xl mr-4 drop-shadow-md transition-all" />
              <h2 className="text-white font-bold text-2xl">Bid Create</h2>
            </div>
          </div>
        </NavLink>

        {/* Products Card */}
        <NavLink
          to="/bidding-products"
          className="w-full"
          aria-label="Complete Invoice"
        >
          <div className="bg-gradient-to-br from-green-300 to-green-500 border border-green-400 shadow-xl rounded-xl p-8 transition-all transform hover:scale-110 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center">
              <FaBoxOpen className="text-white text-3xl mr-4 drop-shadow-md transition-all" />
              <h2 className="text-white font-bold text-2xl">Products</h2>
            </div>
          </div>
        </NavLink>
        {/* Winners Card */}
        <NavLink
          to="/biddingWinner"
          className="w-full"
          aria-label="Complete Invoice"
        >
          <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 border border-yellow-400 shadow-xl rounded-xl p-8 transition-all transform hover:scale-110 hover:shadow-2xl cursor-pointer">
            <div className="flex items-center">
              <FaBoxOpen className="text-white text-3xl mr-4 drop-shadow-md transition-all" />
              <h2 className="text-white font-bold text-2xl">Winners</h2>
            </div>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BiddingItems;

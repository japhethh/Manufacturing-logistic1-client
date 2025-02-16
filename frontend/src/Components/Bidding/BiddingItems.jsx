import { NavLink } from "react-router-dom";

const BiddingItems = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 ">
        <NavLink to="/bidding-category" className="w-full" aria-label="All Invoice">
          <div className="card bg-gradient-to-br from-blue-100 to blue-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-blue-800 font-bold text-lg sm:text-xl">
                Category
              </h2>
            </div>
            <span className="badge bg-gradient-to-r from-blue-300 to-blue-500 text-white rounded-full px-3 py-1 text-xs font-semibold"></span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/pending"
          className="w-full"
          aria-label="Pending Invoice"
        >
          <div className="card bg-gradient-to-br from-cyan-100 to-cyan-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-cyan-800 font-bold text-lg sm:text-xl">
                Pending Invoice
              </h2>
            </div>
            <span className="badge bg-gradient-to-r from-cyan-300 to-cyan-500 text-white rounded-full px-3 py-1 text-xs font-semibold"></span>
          </div>
        </NavLink>

        <NavLink
          to="/invoice/complete"
          className="w-full"
          aria-label="Complete Invoice"
        >
          <div className="card bg-gradient-to-br from-green-100 to-green-50 shadow-xl rounded-lg p-6 text-center transition-all transform hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-green-800 font-bold text-lg sm:text-xl">
                Complete Invoice
              </h2>
            </div>
            <span className="badge bg-gradient-to-r from-green-300 to-green-500 text-white rounded-full px-3 py-1 text-xs font-semibold"></span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default BiddingItems;

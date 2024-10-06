import { NavLink, Outlet } from "react-router-dom";
import { MdOutlinePendingActions } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaCalendarCheck } from "react-icons/fa";

const OrdersVendor = () => {
  return (
    <div className="p-6 bg-white min-h-screen">
      {/* The three cards that stay at the top */}
      <div className="flex justify-between gap-2 mb-10">
        <NavLink to="/PendingOrdersVendor">
          <div className="card bg-blue-500 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-white/80 font-bold justify-between">
                Pending Orders <MdOutlinePendingActions className="size-10" />
              </h2>
            </div>
          </div>
        </NavLink>

        <NavLink to="/ReceivingOrdersVendor">
          <div className="card bg-blue-500 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-white/80 font-bold justify-between">
                Receiving Orders <GiReceiveMoney className="size-10" />
              </h2>
            </div>
          </div>
        </NavLink>

        <NavLink to="/CompleteOrdersVendor">
          <div className="card bg-blue-500 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-white/80 font-bold justify-between">
                Complete Orders <FaCalendarCheck className="size-10" />
              </h2>
            </div>
          </div>
        </NavLink>
      </div>

      {/* This is where the selected component will be displayed */}
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
};

export default OrdersVendor;

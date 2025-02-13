import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiTruck, FiPackage, FiCheckCircle, FiPlus, FiAlertTriangle, FiClipboard } from "react-icons/fi";

const ShipmentVendor = () => {
  const [shipmentDate, setShipmentDate] = useState(null);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-900 text-center flex items-center justify-center gap-2">
        <FiTruck className="text-blue-600 font-Roboto"/> Shipment Management
      </h1>

      {/* Shipment Overview */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-Roboto">Shipment Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 bg-gray-50 rounded-lg shadow-md text-center border border-gray-200">
            <div className="text-gray-600 font-Roboto">Total Shipments</div>
            <div className="text-3xl font-bold text-gray-900 font-Roboto flex items-center justify-center gap-2">
              <FiPackage className="text-blue-600 font-Roboto" /> 350
            </div>
            <div className="text-gray-500 font-Roboto">Shipments Processed</div>
          </div>
          <div className="p-5 bg-blue-50 rounded-lg shadow-md text-center border border-blue-200">
            <div className="text-blue-600 font-Roboto">In-Transit</div>
            <div className="text-3xl font-bold text-blue-500 font-Roboto flex items-center justify-center gap-2">
              <FiTruck className="text-blue-600 font-Roboto" /> 25
            </div>
            <div className="text-gray-500 font-Roboto">Currently In-Transit</div>
          </div>
          <div className="p-5 bg-green-50 rounded-lg shadow-md text-center border border-green-200">
            <div className="text-green-600 font-Roboto">Delivered</div>
            <div className="text-3xl font-bold text-green-500 flex items-center justify-center gap-2">
              <FiCheckCircle className="text-green-600 font-Roboto" /> 320
            </div>
            <div className="text-gray-500 font-Roboto">Shipments Delivered</div>
          </div>
        </div>
      </div>

      {/* Create Shipment */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-Roboto">Create Shipment</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1 font-Roboto">Vendor</label>
            <select className="select select-bordered w-full bg-gray-50 p-2 rounded-lg border font-Roboto">
              <option>Select Vendor</option>
              <option>Vendor A</option>
              <option>Vendor B</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 font-Roboto">Shipment Date</label>
            <DatePicker
              selected={shipmentDate}
              onChange={(date) => setShipmentDate(date)}
              className="input input-bordered w-full bg-gray-50 p-2 rounded-lg border font-Roboto"
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a date"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 font-Roboto">Carrier</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-50 p-2 rounded-lg border font-Roboto"
              placeholder="Enter Carrier Name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 font-Roboto">Tracking Number</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-50 p-2 rounded-lg border font-Roboto"
              placeholder="Enter Tracking Number"
            />
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 text-white font-Roboto px-5 py-2 rounded-lg transition duration-200 w-full flex items-center justify-center gap-2">
            <FiPlus className="text-white" /> Create Shipment
          </button>
        </form>
      </div>

      {/* Shipment Alerts */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-Roboto">Shipment Alerts</h2>
        <div className="bg-yellow-100 text-yellow-700 font-Roboto p-4 rounded-lg flex items-center gap-2 border-l-4 border-yellow-500">
          <FiAlertTriangle className="text-yellow-600 font-Roboto" /> Delayed Shipment: Order #12345 is delayed by 2 days.
        </div>
      </div>

      {/* Shipment Reports */}
      <div className="mb-8 bg-white shadow-xl rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 font-Roboto mb-6">Shipment Reports</h2>
        <button className="bg-blue-600 hover:bg-blue-500 text-white font-Roboto px-5 py-2 rounded-lg transition duration-200 w-full flex items-center justify-center gap-2">
          <FiClipboard className="text-white" /> Generate Shipment Report
        </button>
      </div>
    </div>
  );
};

export default ShipmentVendor;

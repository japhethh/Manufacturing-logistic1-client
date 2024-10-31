import  { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ShipmentVendor = () => {
  const [shipmentDate, setShipmentDate] = useState(null);

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shipment Management</h1>

      {/* Shipment Dashboard */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Overview</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Total Shipments</div>
            <div className="stat-value text-3xl text-gray-800">350</div>
            <div className="stat-desc text-gray-500">Shipments Processed</div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">In-Transit</div>
            <div className="stat-value text-3xl text-blue-500">25</div>
            <div className="stat-desc text-gray-500">Currently In-Transit</div>
          </div>
          <div className="stat bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="stat-title text-gray-600">Delivered</div>
            <div className="stat-value text-3xl text-green-500">320</div>
            <div className="stat-desc text-gray-500">Shipments Delivered</div>
          </div>
        </div>
      </div>

      {/* Create Shipment */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Create Shipment</h2>
        <form className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-black/80 font-medium">Vendor</span>
            </label>
            <select className="select select-bordered w-full bg-gray-50">
              <option>Select Vendor</option>
              <option>Vendor A</option>
              <option>Vendor B</option>
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/80 font-medium">Shipment Date</span>
            </label>
            <DatePicker
              selected={shipmentDate}
              onChange={(date) => setShipmentDate(date)}
              className="input input-bordered w-full bg-gray-50"
              dateFormat="yyyy/MM/dd"
              placeholderText="Select a date"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/80 font-medium">Carrier</span>
            </label>
            <input type="text" className="input input-bordered w-full bg-gray-50" placeholder="Enter Carrier Name" />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-black/80 font-medium">Tracking Number</span>
            </label>
            <input type="text" className="input input-bordered w-full bg-gray-50" placeholder="Enter Tracking Number" />
          </div>

          <button className="btn btn-primary mt-4 w-full">Create Shipment</button>
        </form>
      </div>

      {/* Shipment Alerts */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Alerts</h2>
        <div className="alert alert-warning shadow-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
          <span>Delayed Shipment: Order #12345 is delayed by 2 days.</span>
        </div>
      </div>

      {/* Shipment Reports */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Shipment Reports</h2>
        <button className="btn btn-outline btn-primary w-full">Generate Shipment Report</button>
      </div>
    </div>
  );
};

export default ShipmentVendor;

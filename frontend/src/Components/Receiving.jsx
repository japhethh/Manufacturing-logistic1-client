import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'tailwindcss/tailwind.css';
import 'daisyui/dist/full.css';

const Receiving = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    $(document).ready(function () {
      $('#receivingTable').DataTable();
    });
  }, []);

  const handleRowClick = (item) => {
    setDetails(item);
  };

  const data = [
    {
      itemCode: '1001',
      description: 'Raw Material A',
      quantity: 500,
      receivedDate: '2024-10-26',
      status: 'Received',
      details: 'This material is used for the production of X.',
    },
    {
      itemCode: '1002',
      description: 'Component B',
      quantity: 300,
      receivedDate: '2024-10-25',
      status: 'Pending',
      details: 'This component is a part of the Y assembly.',
    },
    {
      itemCode: '1003',
      description: 'Finished Product C',
      quantity: 200,
      receivedDate: '2024-10-24',
      status: 'Received',
      details: 'This product is ready for shipment.',
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-extrabold mb-8 text-center drop-shadow-lg">
        Receiving in Warehouse Management
      </h1>
      <div className="mb-12">
        <div className="overflow-x-auto">
          <table
            id="receivingTable"
            className="display nowrap w-full bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg text-black shadow-lg"
          >
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th>Item Code</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Received Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} onClick={() => handleRowClick(item)}>
                  <td>{item.itemCode}</td>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{item.receivedDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {details && (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg mt-4">
          <h2 className="text-2xl font-bold mb-4">Item Details</h2>
          <p><strong>Item Code:</strong> {details.itemCode}</p>
          <p><strong>Description:</strong> {details.description}</p>
          <p><strong>Quantity:</strong> {details.quantity}</p>
          <p><strong>Received Date:</strong> {details.receivedDate}</p>
          <p><strong>Status:</strong> {details.status}</p>
          <p><strong>Details:</strong> {details.details}</p>
          <button className="btn btn-primary mt-4">Update Status</button>
        </div>
      )}
    </div>
  );
};

export default Receiving;

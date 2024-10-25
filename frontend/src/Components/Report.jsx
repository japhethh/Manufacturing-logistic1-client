import React, { useEffect } from 'react'
import $ from 'jquery'
import 'datatables.net-dt'

const Report = () => {
  useEffect(() => {
    $(document).ready(function () {
      $('#reportTable').DataTable()
    })
  }, [])

  // Mock data for the report
  const summary = {
    totalOrders: 120,
    dispatchedOrders: 85,
    pendingOrders: 35,
    deliverySuccessRate: '91%',
  }

  const reportDetails = [
    { 
      orderId: '001', 
      customer: 'ABC Corp', 
      status: 'Delivered', 
      deliveryDate: '2024-11-01', 
      success: true 
    },
    { 
      orderId: '002', 
      customer: 'XYZ Ltd', 
      status: 'In Transit', 
      deliveryDate: '2024-11-03', 
      success: false 
    },
    { 
      orderId: '003', 
      customer: 'DEF Inc', 
      status: 'Pending', 
      deliveryDate: '2024-11-05', 
      success: false 
    },
  ]

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Monthly Report Summary</h1>

      <div className="grid gap-6 mb-8 grid-cols-2 md:grid-cols-4">
        <div className="p-4 bg-base-100 shadow-md rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-xl">{summary.totalOrders}</p>
        </div>

        <div className="p-4 bg-base-100 shadow-md rounded-lg text-center">
          <h2 className="text-lg font-semibold">Dispatched Orders</h2>
          <p className="text-xl">{summary.dispatchedOrders}</p>
        </div>

        <div className="p-4 bg-base-100 shadow-md rounded-lg text-center">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-xl">{summary.pendingOrders}</p>
        </div>

        <div className="p-4 bg-base-100 shadow-md rounded-lg text-center">
          <h2 className="text-lg font-semibold">Delivery Success Rate</h2>
          <p className="text-xl">{summary.deliverySuccessRate}</p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4 text-center">Detailed Report</h2>
      <div className="overflow-x-auto">
        <table id="reportTable" className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Delivery Date</th>
              <th>Success</th>
            </tr>
          </thead>
          <tbody>
            {reportDetails.map((report) => (
              <tr key={report.orderId}>
                <td>{report.orderId}</td>
                <td>{report.customer}</td>
                <td>{report.status}</td>
                <td>{report.deliveryDate}</td>
                <td>{report.success ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Report

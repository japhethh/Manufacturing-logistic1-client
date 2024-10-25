import React, { useEffect } from 'react'
import $ from 'jquery'
import 'datatables.net-dt'

const Dispatches = () => {
  useEffect(() => {
    $(document).ready(function () {
      $('#dispatchTable').DataTable()
    })
  }, [])

  const dispatches = [
    { 
      dispatchId: 'D001', 
      orderId: '001', 
      vehicle: 'Truck A - ABC1234', 
      driver: 'John Doe', 
      status: 'In Transit', 
      dispatchDate: '2024-11-01 08:30', 
      estimatedArrival: '2024-11-02 14:00' 
    },
    { 
      dispatchId: 'D002', 
      orderId: '002', 
      vehicle: 'Van B - XYZ5678', 
      driver: 'Jane Smith', 
      status: 'Delivered', 
      dispatchDate: '2024-11-01 09:00', 
      estimatedArrival: '2024-11-02 15:30' 
    },
    { 
      dispatchId: 'D003', 
      orderId: '003', 
      vehicle: 'Truck C - LMN4321', 
      driver: 'Bob Lee', 
      status: 'Dispatched', 
      dispatchDate: '2024-11-01 10:15', 
      estimatedArrival: '2024-11-02 17:00' 
    },
  ]

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">Dispatches Overview</h1>

      <div className="overflow-x-auto">
        <table id="dispatchTable" className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Dispatch ID</th>
              <th>Order ID</th>
              <th>Vehicle</th>
              <th>Driver</th>
              <th>Status</th>
              <th>Dispatch Date</th>
              <th>Estimated Arrival</th>
            </tr>
          </thead>
          <tbody>
            {dispatches.map((dispatch) => (
              <tr key={dispatch.dispatchId}>
                <td>{dispatch.dispatchId}</td>
                <td>{dispatch.orderId}</td>
                <td>{dispatch.vehicle}</td>
                <td>{dispatch.driver}</td>
                <td>{dispatch.status}</td>
                <td>{dispatch.dispatchDate}</td>
                <td>{dispatch.estimatedArrival}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Dispatches

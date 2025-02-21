import React, { useEffect, useState } from "react";
import axios from "axios";

const PaymentLinks = () => {
  const [unpaidLinks, setUnpaidLinks] = useState([]);
  const [paidLinks, setPaidLinks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentLinks = async () => {
      try {
        const response = await axios.get("http://localhost:7681/api/payment/payment-links");
        setUnpaidLinks(response.data.unpaid);
        setPaidLinks(response.data.paid);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
        console.error("Error fetching payment links:", err);
      }
    };

    fetchPaymentLinks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-center text-blue-600 mb-6">Payment Links</h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="mb-4">
        <h2 className="text-xl text-green-600">Paid Links</h2>
        {paidLinks.length > 0 ? (
          <ul className="list-disc ml-6">
            {paidLinks.map((link) => (
              <li key={link.id}>
                <a href={link.attributes.checkout_url} target="_blank" rel="noopener noreferrer">
                  {link.attributes.description} - PHP {link.attributes.amount / 100}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No paid links available.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl text-red-600">Unpaid Links</h2>
        {unpaidLinks.length > 0 ? (
          <ul className="list-disc ml-6">
            {unpaidLinks.map((link) => (
              <li key={link.id}>
                <a href={link.attributes.checkout_url} target="_blank" rel="noopener noreferrer">
                  {link.attributes.description} - PHP {link.attributes.amount / 100}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unpaid links available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentLinks;

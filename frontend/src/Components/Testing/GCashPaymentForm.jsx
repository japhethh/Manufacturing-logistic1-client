import React, { useState } from 'react';
import axios from 'axios';

const GCashPaymentForm = () => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [unpaidLinks, setUnpaidLinks] = useState([]); // Array for unpaid payment links
  const [paidLinks, setPaidLinks] = useState([]); // Array for paid payment links

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:4000/api/payment/payment-link', {
        amount,
        description,
        remarks,
      });
      
      const generatedLink = response.data.link;
      setUnpaidLinks([...unpaidLinks, { link: generatedLink, amount, description, remarks }]); // Store unpaid link
      setSuccessMessage("Payment link created successfully!");
      
      // Optional: Redirect to the payment link
      window.open(generatedLink, '_blank'); // Open in new tab
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
      console.error("Error creating payment link:", err);
    }
  };

  const handleMarkAsPaid = (link) => {
    // Remove the link from unpaid links and add it to paid links
    setUnpaidLinks(unpaidLinks.filter((item) => item.link !== link));
    setPaidLinks([...paidLinks, link]);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl text-center text-blue-600 mb-6">GCash Payment</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <input
          type="text"
          placeholder="Remarks (optional)"
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Payment Link
        </button>
      </form>
      
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
      
      {/* Display unpaid payment links */}
      <h2 className="text-xl mt-6">Unpaid Payment Links</h2>
      <ul>
        {unpaidLinks.map((item, index) => (
          <li key={index} className="flex justify-between mt-2">
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
              {item.description} - {item.amount}
            </a>
            <button 
              onClick={() => handleMarkAsPaid(item.link)} 
              className="ml-4 text-green-600 underline">
              Mark as Paid
            </button>
          </li>
        ))}
      </ul>

      {/* Display paid payment links */}
      <h2 className="text-xl mt-6">Paid Payment Links</h2>
      <ul>
        {paidLinks.map((link, index) => (
          <li key={index} className="mt-2 text-gray-600">
            {link}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GCashPaymentForm;

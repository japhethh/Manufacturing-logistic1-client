import React, { useState } from 'react';

const CommunicationVendor = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', content: 'Hello, Vendor A. Can we discuss the latest order?', timestamp: '2024-09-29 10:00 AM' },
    { id: 2, sender: 'Vendor A', content: 'Sure! I am available for a call.', timestamp: '2024-09-29 10:05 AM' },
    { id: 3, sender: 'You', content: 'Great! Let’s schedule a call.', timestamp: '2024-09-29 10:10 AM' },
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        content: message,
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Vendor Communication</h1>

      {/* Communication Overview */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Messages</h2>
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
          {messages.map((msg) => (
            <div key={msg.id} className={`p-4 border-b last:border-b-0 ${msg.sender === 'You' ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-800'}`}>
              <div className="font-semibold">{msg.sender}</div>
              <div>{msg.content}</div>
              <div className="text-sm text-gray-500">{msg.timestamp}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Send Message Form */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Send Message</h2>
        <form onSubmit={handleSendMessage} className="space-y-6">
          <textarea
            className="textarea textarea-bordered w-full bg-gray-50"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
          ></textarea>
          <button className="btn btn-primary w-full">Send Message</button>
        </form>
      </div>

      {/* Communication Alerts */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Communication Alerts</h2>
        <div className="alert alert-info shadow-md bg-blue-100 border-l-4 border-blue-500 text-blue-700">
          <span>New message from Vendor B: "We have an update on your shipment."</span>
        </div>
      </div>
    </div>
  );
};

export default CommunicationVendor;

import  { useState } from 'react';

const CommunicationVendor = () => {
  const [message, setMessage] = useState('');
  const [selectedVendor, setSelectedVendor] = useState('Vendor A');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'You', content: 'Hello, Vendor A. Can we discuss the latest order?', timestamp: '2024-09-29 10:00 AM' },
    { id: 2, sender: 'Vendor A', content: 'Sure! I am available for a call.', timestamp: '2024-09-29 10:05 AM' },
    { id: 3, sender: 'You', content: 'Great! Let’s schedule a call.', timestamp: '2024-09-29 10:10 AM' },
    { id: 4, sender: 'Vendor A', content: 'We shipped your order.', timestamp: '2024-09-29 11:00 AM' },
    { id: 5, sender: 'You', content: 'Thanks for the update!', timestamp: '2024-09-29 11:05 AM' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredMessages = messages.filter(msg =>
    msg.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Vendor Communication</h1>

      {/* Vendor Selection */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Vendor</h2>
        <select
          value={selectedVendor}
          onChange={(e) => setSelectedVendor(e.target.value)}
          className="select select-bordered w-full bg-gray-50"
        >
          <option>Vendor A</option>
          <option>Vendor B</option>
          <option>Vendor C</option>
        </select>
      </div>

      {/* Communication Overview */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Messages with {selectedVendor}</h2>
        
        {/* Search Messages */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search messages..."
            className="input input-bordered w-full bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-4 border-b last:border-b-0 ${
                  msg.sender === 'You' ? 'bg-blue-50 text-blue-800' : 'bg-gray-50 text-gray-800'
                }`}
              >
                <div className="font-semibold">{msg.sender}</div>
                <div>{msg.content}</div>
                <div className="text-sm text-gray-500">{msg.timestamp}</div>
              </div>
            ))
          ) : (
            <div className="p-4 text-gray-500">No messages found.</div>
          )}
        </div>
      </div>

      {/* Send Message Form */}
      <div className="mb-8 bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Send Message to {selectedVendor}</h2>
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
        <div className="alert alert-warning shadow-md bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 mt-2">
          <span>Reminder: Don't forget to follow up on overdue invoices.</span>
        </div>
      </div>

      {/* Additional Features */}
      <div className="bg-white card shadow-lg p-6 border border-gray-200 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Important Contacts</h2>
        <ul className="space-y-2">
          <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
            <span>Vendor A</span>
            <button className="btn btn-outline btn-success btn-sm">Contact</button>
          </li>
          <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
            <span>Vendor B</span>
            <button className="btn btn-outline btn-success btn-sm">Contact</button>
          </li>
          <li className="flex justify-between items-center bg-gray-50 p-4 rounded-md border border-gray-200">
            <span>Vendor C</span>
            <button className="btn btn-outline btn-success btn-sm">Contact</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommunicationVendor;

import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import './styles.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { FaSearch, FaCog, FaEllipsisV, FaPlus } from 'react-icons/fa';

// Sidebar Component
const Sidebar = ({ contacts }) => (
  <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto shadow-md">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">Manufacturing Chat</h2>
      <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-200">
        <FaPlus />
      </button>
    </div>
    <div className="space-y-4">
      {contacts.map(contact => (
        <Contact key={contact.name} contact={contact} />
      ))}
    </div>
  </div>
);

// Contact Component
const Contact = ({ contact }) => (
  <div className="flex items-center space-x-4 p-2 hover:bg-gray-200 rounded-lg transition duration-150">
    <Avatar src="https://via.placeholder.com/40" name={contact.name} className="rounded-full border" />
    <div>
      <p className="font-semibold text-gray-800">{contact.name}</p>
      <p className="text-sm text-gray-600">{contact.lastMessage}</p>
      <p className="text-xs text-gray-400">{contact.time}</p>
    </div>
  </div>
);

// Chat Header Component
const ChatHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <div className="space-x-2">
      <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition duration-200">
        <FaSearch />
      </button>
      <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition duration-200">
        <FaCog />
      </button>
      <button className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition duration-200">
        <FaEllipsisV />
      </button>
    </div>
  </div>
);

// Main Chat UI Component
const Messages = () => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const contacts = [
    { name: 'Warehouse Manager', lastMessage: 'Inventory check complete.', time: '8:10 AM' },
    { name: 'Logistics Coordinator', lastMessage: 'Order shipped to client.', time: 'Yesterday' },
    { name: 'Supplier Relations', lastMessage: 'New parts shipment on 12/5.', time: 'December 2' },
    { name: 'Production Lead', lastMessage: 'New production cycle started.', time: 'December 2' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar contacts={contacts} />

      {/* Main Chat Window */}
      <div className="w-3/4 bg-white p-4 relative overflow-y-auto shadow-md">
        <ChatHeader title="Logistics Coordinator" />
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={isTyping ? <TypingIndicator content="Coordinator is typing..." className="typing-indicator" /> : null}>
              {[
                { message: 'All orders from Warehouse 2 are shipped.', sender: 'You', direction: 'outgoing' },
                { message: 'Great! Has the client confirmed receipt?', sender: 'Logistics Coordinator' },
                { message: 'Not yet. I’ll send a follow-up.', sender: 'You', direction: 'outgoing' },
                { message: 'Thanks. Also, did we finalize the restocking for December?', sender: 'Logistics Coordinator' },
                { message: 'Yes, the materials are set to arrive on the 15th.', sender: 'You', direction: 'outgoing' },
                { message: 'Perfect. Let’s monitor the timeline closely.', sender: 'Logistics Coordinator' },
              ].map((msg, idx) => (
                <Message
                  key={idx}
                  model={{
                    message: msg.message,
                    sentTime: 'just now',
                    sender: msg.sender,
                    direction: msg.direction || 'incoming',
                  }}
                  avatarPosition="trailing"
                >
                  <Avatar src="https://via.placeholder.com/40" name={msg.sender} className="avatar-3d" />
                </Message>
              ))}
            </MessageList>
            <MessageInput 
              className="bg-gray-50 border border-gray-300 rounded-lg p-2"
              placeholder="Type message here"
              onChange={handleTyping}
              onSend={(messageText) => console.log('Message sent:', messageText)}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default Messages;

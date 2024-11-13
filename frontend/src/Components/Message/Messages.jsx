import React, { useEffect, useState } from "react";
import axios from "axios";
import Store, { apiURL } from "../../context/Store";

import {
  Search,
  MoreVertical,
  Plus,
  Send,
  Paperclip,
  SmilePlus,
  Package,
  Truck,
  Factory,
  Clipboard,
} from "lucide-react";

const Avatar3D = ({ name, isOnline, className }) => {
  // Generate consistent colors based on name
  const getColor = (str) => {
    let hash = 0;
    for (let i = 0; i < str?.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = Math.floor(Math.abs(Math.sin(hash) * 16777215));
    return `#${color.toString(16).padStart(6, "0")}`;
  };

  const baseColor = getColor(name);

  return (
    <div className={`relative ${className}`}>
      <div
        className="rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-200"
        style={{
          background: `linear-gradient(135deg, ${baseColor}, #ffffff)`,
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Base circle for head */}
          <circle cx="50" cy="45" r="35" fill={baseColor} />
          {/* Eyes */}
          <circle cx="35" cy="40" r="5" fill="white" />
          <circle cx="65" cy="40" r="5" fill="white" />
          {/* Smile */}
          <path
            d="M 30 55 Q 50 70 70 55"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Hard hat */}
          <path
            d="M 15 35 Q 50 10 85 35"
            fill="#FFD700"
            stroke="#FFA500"
            strokeWidth="2"
          />
        </svg>
      </div>
      {isOnline && (
        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
      )}
    </div>
  );
};

const Contact = ({ contact, active, onClick }) => {
  // Find the User participant for display on the sidebar
  const userParticipant = contact.participants?.find(
    (participant) => participant.participantType === "User"
  );

  return contact.participants?.map(
    (con, index) =>
      index === 1 && ( // Only render when index is 1
        <div
          key={index}
          onClick={onClick}
          className={`p-3 flex items-center gap-3 hover:bg-gray-100/80 cursor-pointer rounded-xl transition-all duration-200 ${
            active ? "bg-blue-50 scale-[0.98]" : ""
          }`}
        >
          <Avatar3D
            name={con.name ? con.name : con.firstName}
            className="h-12 w-12"
            isOnline={contact?.online}
          />
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <p className="font-medium truncate">
                {/* Display user's name if participant is of type User */}
                {con.participantType === "User"
                  ? userParticipant?.name ||
                    userParticipant?.participantId?.name
                  : con?.participantId?.supplierName}
              </p>
              <span className="text-xs text-gray-500">
                {contact?.createdAt
                  ? new Date(contact.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 truncate">
                {contact?.lastMessage}
              </p>
              {contact?.unread > 0 && (
                <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 text-xs text-white font-medium">
                  {contact?.unread}
                </span>
              )}
            </div>
          </div>
        </div>
      )
  );
};

const Message = ({ message, isOutgoing }) => (
  <div className={`flex gap-3 ${isOutgoing ? "flex-row-reverse" : ""} mb-4`}>
    <Avatar3D name={message?.sender} className="h-8 w-8 self-end" />
    <div
      className={`flex flex-col ${
        isOutgoing ? "items-end" : ""
      } max-w-[85%] sm:max-w-[75%]`}
    >
      <div
        className={`px-4 py-2 rounded-2xl ${
          isOutgoing
            ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
            : "bg-gray-100"
        } shadow-sm`}
      >
        <p className="break-words text-sm">{message?.message}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{message?.time}</span>
    </div>
  </div>
);

const IconButton = ({
  icon: Icon,
  onClick,
  className = "",
  active = false,
}) => (
  <button
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 ${
      active ? "bg-blue-50 text-blue-500" : ""
    } ${className}`}
  >
    <Icon className="h-5 w-5" />
  </button>
);

// Starting point
const ChatUI = () => {
  const [activeContact, setActiveContact] = useState(0);
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { token } = Store();
  const [contacts, setContacts] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([])

  console.log(selectedData);

  const { userData } = Store();

  // const [messages, setMessages] = useState([
  //   {
  //     sender: "Production Manager",
  //     message:
  //       "Line 3 efficiency has increased by 15% after the new updates 📈",
  //     time: "10:32 AM",
  //   },
  //   {
  //     sender: "You",
  //     message:
  //       "Great news! How's the inventory level for raw materials looking?",
  //     time: "10:33 AM",
  //   },
  //   {
  //     sender: "Production Manager",
  //     message:
  //       "Current stock at 85%. We should schedule the next delivery by Friday.",
  //     time: "10:34 AM",
  //   },
  //   {
  //     sender: "You",
  //     message:
  //       "I'll coordinate with logistics. Any maintenance issues to report?",
  //     time: "10:35 AM",
  //   },
  // ]);

  // const contacts = [
  //   {
  //     name: "Production Manager",
  //     lastMessage: "Current stock at 85%...",
  //     time: "10:34 AM",
  //     unread: 2,
  //     online: true,
  //   },
  //   {
  //     name: "Logistics Coordinator",
  //     lastMessage: "3 shipments scheduled today",
  //     time: "9:45 AM",
  //     unread: 0,
  //     online: true,
  //   },
  //   {
  //     name: "Quality Inspector",
  //     lastMessage: "Batch #2234 approved",
  //     time: "Yesterday",
  //     unread: 1,
  //     online: false,
  //   },
  // ];

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios(`${apiURL}/api/chat/getUserChats`, {
        headers: { token: token },
      });

      console.log(response.data);
      setContacts(response.data);
    } catch (error) {
      console.log(error?.response.data.message);
    }
  };


  const fetchMessage = async() => {
    const response = await axios.get(`${apiURL}/api/message/`)
  }

  const handleSend = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          sender: "You",
          message: message,
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  console.log(selectedData);

  const genSender = (log, users) => {
    return users[0]?.participantId?._id === log?._id
      ? users[1]?.participantId?.supplierName
      : "";
  };

  return (
    <div className="h-[calc(100vh-2rem)] max-h-[900px] m-4 flex bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Sidebar */}
      <div
        className={`w-full max-w-xs bg-white border-r transform transition-all duration-300 ease-in-out
          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          } 
          fixed lg:static inset-y-0 left-0 z-40`}
      >
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Factory Chat</h2>
            <div className="flex gap-2">
              <IconButton icon={Factory} className="text-blue-500" />
              <IconButton icon={Plus} />
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search personnel..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <div className="h-[calc(100vh-12rem)] overflow-y-auto">
          {contacts.map((contact, index) => (
            <div key={index}>
              <Contact
                key={contact?.name}
                contact={contact}
                active={index === activeContact}
                onClick={() => {
                  setActiveContact(index);
                  setSelectedData(contact);
                  setIsSidebarOpen(false);
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* End */}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden mr-2"
          >
            <Package className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-3">
            <Avatar3D
              name={contacts[activeContact]?.name}
              className="h-12 w-12"
              isOnline={contacts[activeContact]?.online}
            />
            <div>
              <h3 className="font-semibold">
                {selectedData
                  ? genSender(userData, selectedData.participants)
                  : "Unknown"}
              </h3>

              <span className="text-sm text-gray-500">
                {contacts[activeContact]?.online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <IconButton icon={Truck} className="hidden sm:block" />
            <IconButton icon={Clipboard} className="hidden sm:block" />
            <IconButton icon={Search} />
            <IconButton icon={MoreVertical} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50">
          {messages.map((msg, index) => (
            <Message
              key={index}
              message={msg}
              isOutgoing={msg.sender === "You"}
            />
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t flex items-center gap-2 bg-white">
          <IconButton icon={Paperclip} />
          <IconButton icon={SmilePlus} />
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
          <IconButton
            icon={Send}
            onClick={handleSend}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatUI;

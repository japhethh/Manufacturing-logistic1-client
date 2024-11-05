import React, { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Plus, 
  Send, 
  Paperclip, 
  SmilePlus, 
  Phone, 
  Video,
  Menu,
  X
} from 'lucide-react';

const Avatar = ({ src, fallback, className, isOnline }) => (
  <div className={`relative ${className}`}>
    <div className="rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-200 shadow-lg">
      <img 
        src={src} 
        alt="avatar" 
        className="w-full h-full object-cover"
      />
    </div>
    {isOnline && (
      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
    )}
  </div>
);

const Contact = ({ contact, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-3 flex items-center gap-3 hover:bg-gray-100/80 cursor-pointer rounded-xl transition-all duration-200 ${
      active ? 'bg-blue-50 scale-[0.98]' : ''
    }`}
  >
    <Avatar 
      src={contact.avatar} 
      fallback={contact.name.split(' ').map(n => n[0]).join('')}
      className="h-12 w-12"
      isOnline={contact.online}
    />
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-start">
        <p className="font-medium truncate">{contact.name}</p>
        <span className="text-xs text-gray-500">{contact.time}</span>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
        {contact.unread > 0 && (
          <span className="h-5 w-5 flex items-center justify-center rounded-full bg-blue-500 text-xs text-white font-medium">
            {contact.unread}
          </span>
        )}
      </div>
    </div>
  </div>
);

const Message = ({ message, isOutgoing }) => (
  <div className={`flex gap-3 ${isOutgoing ? 'flex-row-reverse' : ''} mb-4`}>
    <Avatar 
      src={message.avatar} 
      fallback={message.sender[0]}
      className="h-8 w-8 self-end"
    />
    <div className={`flex flex-col ${isOutgoing ? 'items-end' : ''} max-w-[80%] sm:max-w-[70%]`}>
      <div className={`px-4 py-2 rounded-2xl ${
        isOutgoing 
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
          : 'bg-gray-100'
      } shadow-sm`}>
        <p className="break-words">{message.message}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1">{message.time}</span>
    </div>
  </div>
);

const IconButton = ({ icon: Icon, onClick, className = "", active = false }) => (
  <button 
    onClick={onClick}
    className={`p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 ${
      active ? 'bg-blue-50 text-blue-500' : ''
    } ${className}`}
  >
    <Icon className="h-5 w-5" />
  </button>
);

const ChatUI = () => {
  const [activeContact, setActiveContact] = useState(0);
  const [message, setMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'Mark Appleyard',
      message: 'Hey! I just finished the new design concepts 🎨',
      time: '10:32 AM',
      avatar: '/api/placeholder/400/400'
    },
    {
      sender: 'You',
      message: "They look amazing! I especially love the color palette you chose 👏",
      time: '10:33 AM',
      avatar: '/api/placeholder/400/400'
    },
    {
      sender: 'Mark Appleyard',
      message: 'Thanks! Should we schedule a meeting to discuss the implementation?',
      time: '10:34 AM',
      avatar: '/api/placeholder/400/400'
    },
    {
      sender: 'You',
      message: "Absolutely! How about tomorrow at 2 PM? We can go through all the details 📅",
      time: '10:35 AM',
      avatar: '/api/placeholder/400/400'
    }
  ]);

  const contacts = [
    {
      name: 'Mark Appleyard',
      lastMessage: 'Should we schedule a meeting...',
      time: '10:34 AM',
      avatar: '/api/placeholder/400/400',
      unread: 2,
      online: true
    },
    {
      name: 'Sarah Wilson',
      lastMessage: 'The project files are ready!',
      time: '9:45 AM',
      avatar: '/api/placeholder/400/400',
      unread: 0,
      online: true
    },
    {
      name: 'Alex Chen',
      lastMessage: 'Great work on the presentation!',
      time: 'Yesterday',
      avatar: '/api/placeholder/400/400',
      unread: 1,
      online: false
    }
  ];

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, {
        sender: 'You',
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: '/api/placeholder/400/400'
      }]);
      setMessage('');
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="h-screen flex bg-white">
      {/* Mobile Menu Button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white rounded-xl shadow-lg p-2"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-80 bg-white border-r transform transition-transform duration-300 ease-in-out z-40
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4 border-b">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Messages</h2>
            <IconButton icon={Plus} />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <div className="h-[calc(100vh-96px)] overflow-y-auto">
          {contacts.map((contact, index) => (
            <Contact
              key={contact.name}
              contact={contact}
              active={index === activeContact}
              onClick={() => {
                setActiveContact(index);
                setIsSidebarOpen(false);
              }}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center bg-white/80 backdrop-blur-sm sticky top-0">
          <div className="flex items-center gap-3">
            <Avatar 
              src={contacts[activeContact].avatar}
              fallback={contacts[activeContact].name[0]}
              className="h-12 w-12"
              isOnline={contacts[activeContact].online}
            />
            <div>
              <h3 className="font-semibold">{contacts[activeContact].name}</h3>
              <span className="text-sm text-gray-500">
                {contacts[activeContact].online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <IconButton icon={Phone} className="hidden sm:block" />
            <IconButton icon={Video} className="hidden sm:block" />
            <IconButton icon={Search} />
            <IconButton icon={MoreVertical} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((msg, index) => (
            <Message
              key={index}
              message={msg}
              isOutgoing={msg.sender === 'You'}
            />
          ))}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
          <div className="flex gap-2 items-center">
            <IconButton icon={Paperclip} className="hidden sm:block" />
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton icon={SmilePlus} className="hidden sm:block" />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
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
  <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold">Louie Barletta</h2>
      <button className="bg-blue-500 text-white p-2 rounded">
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
  <div className="flex items-center space-x-4">
    <Avatar src="https://via.placeholder.com/40" name={contact.name} className="rounded-full border" />
    <div>
      <p className="font-bold">{contact.name}</p>
      <p className="text-sm text-gray-600">{contact.lastMessage}</p>
      <p className="text-xs text-gray-400">{contact.time}</p>
    </div>
  </div>
);

// Chat Header Component
const ChatHeader = ({ title }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold">{title}</h2>
    <div className="space-x-2">
      <button className="bg-gray-300 p-2 rounded">
        <FaSearch />
      </button>
      <button className="bg-gray-300 p-2 rounded">
        <FaCog />
      </button>
      <button className="bg-gray-300 p-2 rounded">
        <FaEllipsisV />
      </button>
    </div>
  </div>
);

// Main Chat UI Component
const ChatUI = () => {
  const [isTyping, setIsTyping] = useState(false);

  const handleTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const contacts = [
    { name: 'Annie Carpenter', lastMessage: 'Did you talk to Mark?', time: '10:37 AM' },
    { name: 'Mark Appleyard', lastMessage: 'Lunch tomorrow. I\'ll call you', time: '2:31 AM' },
    { name: 'Bradley Stokes', lastMessage: 'Sent a photo', time: 'December 2' },
    { name: 'Emilie Wagner', lastMessage: 'You: I\'m there in 10 min', time: 'December 2' },
    { name: 'Lewis Butler', lastMessage: '', time: 'December 2' },
    { name: 'Jeff Ballard', lastMessage: 'Nice, let\'s talk on Tuesday.', time: 'December 2' },
    { name: 'Delia Nelson', lastMessage: 'You: lol', time: 'December 3' },
    { name: 'Juan Robbins', lastMessage: '', time: 'December 3' }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar contacts={contacts} />

      {/* Main Chat Window */}
      <div className="w-3/4 bg-white p-4 relative overflow-y-auto">
        <ChatHeader title="Mark Appleyard" />
        <MainContainer>
          <ChatContainer>
            <MessageList typingIndicator={isTyping ? <TypingIndicator content="User is typing..." className="typing-indicator" /> : null}>
              {[
                { message: 'I\'ve sent you an email with the materials.', sender: 'You', direction: 'outgoing' },
                { message: 'Yes. Should we move it to next week?', sender: 'Mark' },
                { message: 'Sure, whatever suits you. 😅 I\'m free whenever 😁', sender: 'You', direction: 'outgoing' },
                { message: 'And I\'ll update the calendar. I thought I already updated it.', sender: 'Mark' },
                { message: 'It\'s all good fam.', sender: 'You', direction: 'outgoing' },
                { message: 'I rescheduled it to every first Wednesday in the month. But we can do it next week whenever you want?', sender: 'Mark' },
                { message: 'Cool bro. ✌️ Next Thursday at about 13:00?', sender: 'You', direction: 'outgoing' },
                { message: 'Ok, I\'ll let you know.', sender: 'Mark' },
                { message: '👌', sender: 'You', direction: 'outgoing' }
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
              className="bg-white"
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

export default ChatUI;

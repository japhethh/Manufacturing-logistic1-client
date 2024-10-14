import { useEffect, useState } from "react";
import io from "socket.io-client";

const Socket = () => {
  const ENDPOINT =
    window.location.hostname === "localhost"
      ? "http://localhost:4000"
      : "https://backend-logistic1.jjm-manufacturing.com";

  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io(ENDPOINT); // Initialize socket connection once
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on("newMessage", (message) => {
      console.log("Received new message:", message);
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("testing", (kupal) => {
      console.log(kupal);
    });

    return () => {
      newSocket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, [ENDPOINT]);

  const joinRoom = (e) => {
    e.preventDefault();

    if (socket && room) {
      socket.emit("joinRoom", room); // Use the existing socket connection
      setRoom(""); // Clear input after joining
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (socket && message && room) {
      socket.emit("sendMessage", { room, message });
      console.log(`Message sent from ${socket.id} to room ${room}: ${message}`);
      setMessage(""); // Clear input after sending
    } else {
      console.log("Failed to send message: Socket or room not defined");
    }
  };

  return (
    <div className="p-5 bg-base-200 h-screen">
      <form onSubmit={joinRoom}>
        <label htmlFor="room" className="label">
          Room
        </label>
        <input
          className="input input-border"
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room"
        />
        <button type="submit" className="btn btn-primary block mt-2">
          Join Room
        </button>
      </form>

      <h3 className="font-semibold text-xl my-4 text-center">Chat</h3>
      <form onSubmit={sendMessage}>
        <label htmlFor="message" className="block label">
          Message
        </label>
        <input
          className="input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message"
        />
        <button type="submit" className="btn btn-secondary my-3">
          Send
        </button>
      </form>

      <div>
        <h4 className="font-semibold text-xl text-center">Messages</h4>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.senderId}:</strong> {msg.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Socket;

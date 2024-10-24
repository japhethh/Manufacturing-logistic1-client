// config / socketService.js;
export default function socketService(io) {
  io.on("connection", (socket) => {
    console.log("Connected to Socket.IO");

    socket.on("setup", (userData) => {
      socket.join(userData._id); // Join the user to a room with their unique ID
      socket.userData = userData;
      console.log(`${userData.name} has connected`);
      socket.emit("connected");
    });

    socket.on("join chat", (room) => {
      socket.join(room);
      console.log(`User joined room ${room}`);
    });

    socket.on("joinRoom", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room ${room}`);
    });

    socket.on("sendMessage", ({ room, message }) => {
      if (socket.rooms.has(room)) {
        // Ensure the user is in the room
        console.log(`Message from ${socket.id} to room ${room}: ${message}`);
        io.to(room).emit("newMessage", { senderId: socket.id, message });
      } else {
        console.log(`User ${socket.id} is not in room ${room}.`);
      }
    });

    socket.on("connect_error", (err) => {
      console.log("Connection error:", err);
    });

    socket.on("reconnect_attempt", () => {
      console.log("Attempting to reconnect...");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected successfully on attempt", attemptNumber);
    });

    socket.on("reconnect_error", (err) => {
      console.log("Reconnection error:", err);
    });

    // // Simulate sending a notification to a client
    // socket.on("send-notification", (notification) => {
    //   // Broadcast notification to all connected clients
    //   io.emit("receive-notification", notification);
    // });

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}


// config/socketService.js
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

    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });
  });
}

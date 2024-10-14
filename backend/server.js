import express from "express";
import cors from "cors";
import "dotenv/config";
import { ConnectDB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import axios from "axios";
import rawmaterialRouter from "./routes/rawmaterialRoute.js";
import supplierRouter from "./routes/supplierRouter.js";
import materialRouter from "./routes/materialRouter.js";
import jwt from "jsonwebtoken";
import purchaseOrderRouter from "./routes/purchaseOrderRouter.js";
import generalSettingsRouter from "./routes/generalSettingsRouter.js";
import shipmentRouter from "./routes/shipmentRouter.js";
import shipmentHistoryRouter from "./routes/shipmentHistoryRouter.js";
import financeApprovalRouter from "./routes/financeApprovalRouter.js";
import nodemailer from "nodemailer";
import supplierModel from "./models/supplierModel.js";
import expressAsyncHandler from "express-async-handler";
import crypto from "crypto"; // Import Node.js built-in crypto module
import emailSupplierRouter from "./routes/emailSupplierRouter.js";
import vendorRouter from "./routes/vendorRouter.js";
import invoiceVendorRouter from "./routes/invoiceVendorRouter.js";
import { Server } from "socket.io";
import socketService from "./config/socketService.js";

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.post("/api/verifyToken", (req, res) => {
  const { token } = req.body;

  if (!token) {
    // If no token is provided, return an error response
    return res.status(400).json({ valid: false, message: "Token is required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      // If token verification fails, return a 401 Unauthorized error
      return res.status(401).json({ valid: false, message: "Invalid Token" });
    }
    // If token is valid, return decoded data
    res.json({ valid: true, decoded });
  });
});

app.use("/api/user", userRouter);
app.use("/api/rawmaterial", rawmaterialRouter);
app.use("/api/purchase-order", purchaseOrderRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/material", materialRouter);
app.use("/api/generalSettings", generalSettingsRouter);
app.use("/api/shipment", shipmentRouter);
app.use("/api/shipmentHistory", shipmentHistoryRouter);
app.use("/api/financeApproval", financeApprovalRouter);
app.use("/api/email", emailSupplierRouter);
app.use("/api/vendor", vendorRouter);
app.use("/api/invoices", invoiceVendorRouter);

const server = app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: [
      "http://localhost:4000",
      "https://manufacturing-logistic1-client-vendor.onrender.com",
      "https://manufacturing-logistic1-client.onrender.com",
      "https://logistic1.jjm-manufacturing.com",
    ],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.set("socketio", io);

socketService(io);

// io.on("connection", (socket) => {
//   // Login client connects successfully
//   console.log("connected to socket.io");

//   socket.on("setup", (userData) => {
//     socket.join(userData._id); // Join the user to a room with their unique ID.

//     socket.userData = userData;
//     console.log(userData.name + "Ako yung owner");
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Join room" + room);
//   });

//   socket.on("joinRoom", (room) => {
//     socket.join(room);

//     console.log(`User ${socket.id} joined room ${room}`); // Update the log message
//   });

//   socket.on("sendMessage", ({ room, message }) => {
//     if (socket.rooms.has(room)) {
//       // Ensure the user is in the room
//       console.log(`Message from ${socket.id} to room ${room}: ${message}`);
//       io.to(room).emit("newMessage", { senderId: socket.id, message });
//     } else {
//       console.log(`User ${socket.id} is not in room ${room}.`);
//     }
//   });
// });

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
import categoryVendorRouter from "./routes/categoryVendorRouter.js";
import notificationVendorRouter from "./routes/notificationVendorRouter.js";
import notificationLogisticRouter from "./routes/notificationLogisticRouter.js";
import { Server } from "socket.io";
import socketService from "./config/socketService.js";
import adjusted_productsRouter from "./routes/adjusted_productsRouter.js";
import adjustmentsRouter from "./routes/adjustmentsRouter.js";
import trackingOrdersRouter from "./routes/trackingOrdersRouter.js";
import QCInspectionRouter from "./routes/QCInspectionRouter.js";
import defectRouter from "./routes/defectRouter.js";
import paymentRoutes from "./routes/payment.js";
import LogisticPaymentListRouter from "./routes/LogisticPaymentListRouter.js";
import retrievePaymentRouter from "./routes/retrievePayment.js";
import messageRouter from "./routes/messageRouter.js";
import chatRouter from "./routes/chatRouter.js";

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
app.use("/api/category", categoryVendorRouter);
app.use("/api/notifications", notificationVendorRouter);
app.use("/api/notificationsLogistic", notificationLogisticRouter);
app.use("/api/adjusted_products", adjusted_productsRouter);
app.use("/api/adjustments", adjustmentsRouter);
app.use("/api/trackingOrders", trackingOrdersRouter);
app.use("/api/qualityControl", QCInspectionRouter);
app.use("/api/defect", defectRouter);
app.use("/api/payment", paymentRoutes);
app.use("/api/paymentlist", LogisticPaymentListRouter);
app.use("/api/retrievePayment", retrievePaymentRouter);
app.use("/api/message", messageRouter)
app.use("/api/chat",chatRouter)

const server = app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

const io = new Server(server, {
  pingTimeout: 6000,
  cors: {
    origin: [
      "http://localhost:4000",
      "http://localhost:5173",
      "http://localhost:5174",
      "https://manufacturing-logistic1-client-vendor.onrender.com",
      "https://manufacturing-logistic1-client.onrender.com",
      "https://logistic1.jjm-manufacturing.com",
      "https://backend-logistic1.jjm-manufacturing.com",
    ],
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

app.set("socketio", io);

socketService(io);

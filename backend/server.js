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
import crypto from "crypto";
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
import salesAndRevenueRouter from "./routes/salesAndRevenueRouter.js";
import { croncron } from "./cronjob.js";
import { FilterAccounts } from "./testing/aggregateUser.js";
import testingAggregateUserRouter from "./routes/testingAggregateUserRouter.js";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { verifyToken, vendorVerifyToken } from "./middleware/Auth.js";
import vendorProfileRouter from "./routes/vendorProfileRoute.js";
import tf from "@tensorflow/tfjs";

// Import the test file in the using tensorflow
import { trainModel } from "./Ai/TensorFlow.js";
import {
  forecastData,
  getMonthRawMaterial,
} from "./aggregation/rawMaterialAggregation.js";
import tensorflowDf from "./Ai/tensorFlowDemandForecasting.js";
import discrepancyTestRouter from "./Ai/DiscrepancyDetectionTest.js";
import discrepancyTest from "./Ai/testing/discripancyTest.js";
import discrepancyDetectionFinalRouter from "./Ai/DiscrepancyDetection/discrepancyDetectionRouter.js";
import trackingOrderHistoryRouter from "./routes/trackingOrderHistoryRouter.js";
import auditLogisticRouter from "./routes/auditLogisticRouter.js";
import auditVendorRouter from "./routes/auditVendorRouter.js";
import biddingRouter from "./routes/biddingRouter.js";

const port = process.env.PORT || 4000;

const app = express();
app.use(ExpressMongoSanitize());
app.use(cors());
app.use(express.json());

// API endpoint for forecasting demand
app.post("/api/forecast", async (req, res) => {
  const { week } = req.body;

  if (!week) {
    return res.status(400).json({ error: "Week is required" });
  }

  try {
    const model = await trainModel();

    // Create a tensor for the input week
    const inputTensor = tf.tensor2d([week], [1, 1]);

    const prediction = model.predict(inputTensor); // A tensor, e.g., Tensor([[70.5]])
    const predictedDemand = prediction.dataSync()[0]; // A plain array, e.g., [70.5]

    res.json({ week, predictedDemand });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred during prediction",
      details: error.message,
    });
  }
});

ConnectDB();
app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.use("/api/verifyToken", verifyToken);
app.use("/api/vendorVerifyToken", vendorVerifyToken);

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
app.use("/api/message", messageRouter);
app.use("/api/chat", chatRouter);
app.use("/api/salesAndRevenue", salesAndRevenueRouter);
app.use("/api/testing", userRouter);
app.use("/api/rawMaterialAggregation", forecastData);
app.use("/api/demandForecast", tensorflowDf);
app.use("/api/demandForecastMonth", getMonthRawMaterial);
app.use("/api/detectDiscrepancyTest", discrepancyTestRouter);
app.use("/api/discrepancyDetectionFinal", discrepancyDetectionFinalRouter);
app.use("/api/trackingOrdersHistory", trackingOrderHistoryRouter);
app.use("/api/auditLogisticLog", auditLogisticRouter);
app.use("/api/vendorProfile", vendorProfileRouter);
app.use("/api/auditVendorLog", auditVendorRouter);
app.use("/api/bidding", biddingRouter);

// Testing Site
app.use("/api/discrepanciesTest", discrepancyTest);

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

// console.log(croncron);

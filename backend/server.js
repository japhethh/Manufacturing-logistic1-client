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

const port = "https://logistic1.jjm-manufacturing.com";

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: ["https://logistic1.jjm-manufacturing.com"], // Allow both local and production
    credentials: true,
  })
);

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

app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

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

const port = process.env.PORT || 4000;

const app = express();
app.use(cors());
app.use(express.json());

ConnectDB();

app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.use("/api/user", userRouter);
app.use("/api/rawmaterial", rawmaterialRouter);
app.use("/api/supplier", supplierRouter);
app.use("/api/material", materialRouter);
app.post("/api/verifyToken", (req, res) => {
  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ valid: false, message: "Invalid Token" });
    }
    res.json({ valid: true, decoded });
  });
});
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});

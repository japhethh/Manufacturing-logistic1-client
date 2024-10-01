import express from "express";
import {
  registerSupplier,
  sendEmail,
  verifyRegisterFill,
} from "../controllers/emailSupplierController.js";

const emailSupplierRouter = express.Router();

emailSupplierRouter.get("/verify", verifyRegisterFill);
emailSupplierRouter.post("/register-supplier", registerSupplier);
emailSupplierRouter.post("/send-email", sendEmail);

export default emailSupplierRouter;

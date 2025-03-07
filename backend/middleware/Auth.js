import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import supplierModel from "../models/supplierModel.js";
import generateServiceToken from "./gatewayGenerator.js";
import axios from "axios";
// import "dotenv/config";
import expressAsyncHandler from "express-async-handler";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  // console.log(token);
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Error" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.body.userId.role)) {
      return res.sendStatus(403);
    }

    next();
  };
};

const protectMid = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await userModel.findById(decoded.id);
    req.body.userId = userData._id;

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authorized" });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied || roles denied" });
    }
    next();
  };
};

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized!" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request after validation

    const serviceToken = generateServiceToken();

    const response = await axios.get(
      `${process.env.API_GATEWAY_URL}/admin/get-accounts`,
      {
        headers: { Authorization: `Bearer ${serviceToken}` },
      }
    );

    const accountData = response.data;

    const user = accountData.find((a) => a._id === decoded.id);

    // const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, valid: true, decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    console.log(error);
    return res.status(401).json({ message: "Not Authorized: User not found" });
  }
};

const vendorVerifyToken = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not Authorized!" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ success: true, valid: true, decoded });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token Expired" });
    }
    console.log(error);
    return res.status(401).json({ message: "Not Authorized: User not found" });
  }
};

const testingRequestAccount = expressAsyncHandler(async (req, res) => {
  const serviceToken = generateServiceToken();

  const response = await axios.get(
    `${process.env.API_GATEWAY_URL}/admin/get-accounts`,

    {
      headers: { Authorization: `Bearer ${serviceToken}` },
    }
  );

  const accountData = response.data;

  return accountData;
});

export const serviceVerifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token2 = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token2) {
      return res.status(401).json({ message: "Unauthorized access" });
  }

  jwt.verify(token2, process.env.SERVICE_JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = decoded; // Store decoded user data
      next();
  });
};

export {
  authMiddleware,
  authorizeRoles,
  authorize,
  protectMid,
  verifyToken,
  vendorVerifyToken,
  testingRequestAccount,
};

import jwt from "jsonwebtoken";

const generateServiceToken = () => {
  const payload = { service: "Logistic 1" };
  return jwt.sign(payload, process.env.GATEWAY_JWT_SECRET, {
    expiresIn: "10m",
  });
};

export default generateServiceToken;

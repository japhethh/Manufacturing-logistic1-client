import CryptoJS from "crypto-js";

const SECRET_KEY = "kupalkababoss";

export const encryptArray = (dataArray) => {
  // Convert the data array to a JSON string
  const stringfiedData = JSON.stringify(dataArray);
  // Encrypt the JSON string
  return CryptoJS.AES.encrypt(stringfiedData, SECRET_KEY).toString();
};

// Decrypt a single object
export const decryptObject = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

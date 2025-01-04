import axios from "axios";
import { apiURL } from "../context/Store";

export const getCountProducts = async () => {
  const response = await axios(`${apiURL}/api/material/productCount`);

  return response.data;
};

export const getCountVendor = async () => {
  const response = await axios(`${apiURL}/api/vendor/vendorCount`);

  return response.data;
};

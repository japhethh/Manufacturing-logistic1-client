import axios from "axios";
import { apiURL } from "../context/Store";

const pendingInvoice = async () => {
  const response = await axios.get(`${apiURL}/api/invoices/invoicePending`);

  return response.data;
};

const approvedInvoice = async () => {
  const response = await axios.get(`${apiURL}/api/invoices/invoiceApproved`);

  return response.data;
};

const allInvoice = async () => {
  const response = await axios.get(`${apiURL}/api/invoices/invoiceAll`);

  return response.data;
};

export { pendingInvoice, approvedInvoice, allInvoice };

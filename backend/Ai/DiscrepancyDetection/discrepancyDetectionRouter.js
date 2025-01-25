import express from "express";
import TrackingOrderModel from "../../models/trackingOrderModel.js";

const discrepancyDetectionFinalRouter = express.Router();

// Fetch all transaction data and detect discrepancies using basic logic
const detectDiscrepancies = async () => {
  try {
    const transactions = await TrackingOrderModel.find()
      .select(
        "_id invoiceAmount purchaseOrderAmount quantityOrdered quantityInvoiced totalAmount"
      ) // Include _id in the selected fields
      .lean();

    if (!transactions || transactions.length === 0) {
      throw new Error("No transaction data found.");
    }

    // Detect discrepancies using simple conditional checks
    return transactions
      .map((transaction) => {
        const { _id, invoiceAmount = 0, purchaseOrderAmount = 0, quantityOrdered = 0, quantityInvoiced = 0, totalAmount = 0 } = transaction;

        // Check for discrepancies
        const isInvoiceDiscrepancy = invoiceAmount !== purchaseOrderAmount;

        return {
          _id, // Include the transaction ID for reference
          invoiceAmount,
          purchaseOrderAmount,
          quantityOrdered,
          quantityInvoiced,
          totalAmount,
          isDiscrepancy: isInvoiceDiscrepancy,
          discrepancyDetails: {
            invoiceDiscrepancy: isInvoiceDiscrepancy
              ? `Difference: ${invoiceAmount - purchaseOrderAmount}`
              : null,
          },
          discrepancyReason: isInvoiceDiscrepancy
            ? ["Invoice amount and purchase order amount do not match."]
            : [],
        };
      })
      .filter((transaction) => transaction.isDiscrepancy);
  } catch (error) {
    console.error("Error detecting discrepancies", error);
    throw error;
  }
};

// API Route to detect discrepancies
discrepancyDetectionFinalRouter.get("/", async (req, res) => {
  try {
    // Detect discrepancies in all transaction data
    const discrepancies = await detectDiscrepancies();

    // Calculate the total number of discrepancies
    const totalDiscrepancies = discrepancies.length;

    // Send response with discrepancies and summary
    res.json({
      totalDiscrepancies,
      discrepancies,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error detecting discrepancies", details: error.message });
  }
});

export default discrepancyDetectionFinalRouter;

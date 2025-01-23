import tf from "@tensorflow/tfjs";
import express from "express";

const discrepancyTest = express.Router();
const exampleData = [
  { invoiceAmount: 950, purchaseOrderAmount: 1200 }, // Difference: 50
  { invoiceAmount: 1200, purchaseOrderAmount: 1100 }, // Difference: 100
  { invoiceAmount: 750, purchaseOrderAmount: 800 },  // Difference: 50
  { invoiceAmount: 400, purchaseOrderAmount: 550 },  // Difference: 150
  { invoiceAmount: 300, purchaseOrderAmount: 300 },  // Difference: 0
];

const detectDiscrepancies = (data, threshold) => {
  const invoiceAmounts = data.map((item) => item.invoiceAmount);
  const purchaseOrderAmounts = data.map((item) => item.purchaseOrderAmount);

  const invoiceTensor = tf.tensor(invoiceAmounts);
  const purchaseTensor = tf.tensor(purchaseOrderAmounts);

  const discrepancyTensor = invoiceTensor.sub(purchaseTensor).abs();

  return discrepancyTensor
    .greater(tf.scalar(threshold))
    .arraySync()
    .map((flag, index) =>
      flag
        ? {
            index,
            actual: invoiceAmounts[index],
            expected: purchaseOrderAmounts[index],
            difference: Math.abs(
              invoiceAmounts[index] - purchaseOrderAmounts[index]
            ),
          }
        : null
    )
    .filter((item) => item !== null);
};

// API route to detect discrepancies
discrepancyTest.post("/", async (req, res) => {

  console.log(req.body.threshold)
  try {
    const { threshold = 50 } = req.body; // Default threshold is 50
    const discrepancies = detectDiscrepancies(exampleData, threshold);
    res.json({ discrepancies });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error detecting discrepancies", details: error.message });
  }
});

export default discrepancyTest;

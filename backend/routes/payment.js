import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/payment-link", async (req, res) => {
  const { amount, description, remarks } = req.body;

  // Basic validation
  if (!amount || !description) {
    return res
      .status(400)
      .json({ message: "Amount and description are required." });
  }

  // Encode the PayMongo secret key for Basic Auth
  const encodedKey = Buffer.from(
    `${process.env.PAYMONGO_SECRET_KEY}:`
  ).toString("base64");

  // PayMongo API request options
  const options = {
    method: "POST",
    url: "https://api.paymongo.com/v1/links",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      authorization: `Basic ${encodedKey}`, // Use encoded secret key
    },
    data: {
      data: {
        attributes: {
          amount: amount * 100, // Convert to centavos
          description: description,
          remarks: remarks || "", // Optional
        },
      },
    },
  };

  // Make the API call to PayMongo
  try {
    const response = await axios.request(options);
    const paymentLink = response.data.data.attributes.checkout_url;

    console.log("Payment link created successfully:", paymentLink);

    // Send the payment link back to the client
    res.status(200).json({
      message: "Payment link created successfully.",
      link: paymentLink,
    });
  } catch (error) {
    console.error("Error creating payment link:", error);

    res.status(500).json({
      message: "Failed to create payment link. Please try again.",
      error: error.response?.data || error.message,
    });
  }
});

export default router;

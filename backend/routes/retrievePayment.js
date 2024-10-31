import express from "express";
import axios from "axios";
const retrievePaymentRouter = express.Router();

retrievePaymentRouter.get("/retrievePayment/:id", async (req,res) => {
  const {id} = req.params;

  try {
    const response = await axios.get(
      `https://api.paymongo.com/v1/payments/${id} `,
      {
        headers: {
          accep: "application/json",
          authorization: `Basic ${Buffer.from(
            process.env.PAYMONGO_SECRET_KEY
          ).toString("base64")}`,
        },
      }
    );

    res.status(200).json(response.data)

    console.log(response.data);
  } catch (error) {
    console.log("Error fetching payments", error.message);
  }
});


export default retrievePaymentRouter
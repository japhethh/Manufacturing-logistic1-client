// Import necessary modules
import express from 'express';
import axios from 'axios';

// Load environment variables

const router = express.Router();

// Route to fetch the payment list
router.get('/payments', async (req, res) => {
  try {
    const response = await axios.get('https://api.paymongo.com/v1/payments?limit=900', {
      headers: {
        accept: 'application/json',
        authorization: `Basic ${Buffer.from(process.env.PAYMONGO_SECRET_KEY).toString('base64')}`
      }
    });

    console.log(response.data)
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching payments:', error.message);
    res.status(error.response?.status || 500).json({
      error: 'Error fetching payments from PayMongo.',
      details: error.response?.data || 'Unknown error'
    });
  }
});

export default router;

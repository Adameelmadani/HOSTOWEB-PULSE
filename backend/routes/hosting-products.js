const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get hosting products data.
 */
router.get('/hosting-products', async (req, res) => {
  try {
    const hostingProductsArray = await dbClient.getHostingProductsArray();
    res.status(200).send(hostingProductsArray);
  } catch (error) {
    console.error('Failed to fetch hosting products data:', error);
    res.status(500).send({ error: 'Failed to fetch hosting products data' });
  }
});

module.exports = router;

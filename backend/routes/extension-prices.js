const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get extension prices data.
 */
router.get('/extension-prices', async (req, res) => {
  try {
    const extensionPricesArray = await dbClient.getExtensionPricesArray();
    res.status(200).send(extensionPricesArray);
  } catch (error) {
    console.error('Failed to fetch extension prices data:', error);
    res.status(500).send({ error: 'Failed to fetch extension prices data' });
  }
});

module.exports = router;

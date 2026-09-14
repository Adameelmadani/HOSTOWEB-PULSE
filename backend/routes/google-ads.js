const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get Google Ads data.
 */
router.get('/google-ads', async (req, res) => {
  try {
    const googleAdsArray = await dbClient.getGoogleAdsArray();
    res.status(200).send(googleAdsArray);
  } catch (error) {
    console.error('Failed to fetch Google Ads data:', error);
    res.status(500).send({ error: 'Failed to fetch Google Ads data' });
  }
});

module.exports = router;

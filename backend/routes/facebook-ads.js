const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get Facebook Ads data.
 */
router.get('/facebook-ads', async (req, res) => {
  try {
    const facebookAdsArray = await dbClient.getFacebookAdsArray();
    res.status(200).send(facebookAdsArray);
  } catch (error) {
    console.error('Failed to fetch Facebook Ads data:', error);
    res.status(500).send({ error: 'Failed to fetch Facebook Ads data' });
  }
});

module.exports = router;

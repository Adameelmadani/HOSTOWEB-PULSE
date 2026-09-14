const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get social media reach data.
 */
router.get('/social-media-reach', async (req, res) => {
  try {
    const socialMediaReachArray = await dbClient.getSocialMediaReachArray();
    res.status(200).send(socialMediaReachArray);
  } catch (error) {
    console.error('Failed to fetch social media reach data:', error);
    res.status(500).send({ error: 'Failed to fetch social media reach data' });
  }
});

module.exports = router;

const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get security offers data.
 */
router.get('/security-offers', async (req, res) => {
  try {
    const securityOffersArray = await dbClient.getSecurityOffersArray();
    res.status(200).send(securityOffersArray);
  } catch (error) {
    console.error('Failed to fetch security offers data:', error);
    res.status(500).send({ error: 'Failed to fetch security offers data' });
  }
});

module.exports = router;

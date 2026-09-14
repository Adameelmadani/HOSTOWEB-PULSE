const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get companies data.
 */
router.get('/companies', async (req, res) => {
  try {
    const companies = await dbClient.getCompanies();
    res.status(200).send(companies);
  } catch (error) {
    console.error('Failed to fetch companies data:', error);
    res.status(500).send({ error: 'Failed to fetch companies data' });
  }
});

module.exports = router;

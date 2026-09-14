const dbClient = require('../utils/db');
const express = require('express');
const router = express.Router();

/**
 * Route to get blogs data.
 */
router.get('/blogs', async (req, res) => {
  try {
    const blogsArray = await dbClient.getBlogsArray();
    res.status(200).send(blogsArray);
  } catch (error) {
    console.error('Failed to fetch blogs data:', error);
    res.status(500).send({ error: 'Failed to fetch blogs data' });
  }
});

module.exports = router;

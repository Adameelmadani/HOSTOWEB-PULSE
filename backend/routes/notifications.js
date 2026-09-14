const dbClient = require('../utils/db');
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

/**
 * Route to get notifications data.
 */
router.get('/notifications', async (req, res) => {
  try {
    const notificationsArray = await dbClient.getNotificationsArray();
    res.status(200).send(notificationsArray);
  } catch (error) {
    console.error('Failed to fetch notifications data:', error);
    res.status(500).send({ error: 'Failed to fetch notifications data' });
  }
});

/**
 * Route to update the last read notification for a user.
 */
router.post('/notifications/update-last-read', async (req, res) => {
  const { userId, lastMessageId } = req.body;
  try {
    await dbClient.updateUser({ _id: new ObjectId(userId) }, { last_message_id: lastMessageId });
    res.status(200).send({ success: true });
  } catch (error) {
    console.error('Failed to update last read notification:', error);
    res.status(404).send({ error: 'User not found or lastMessageId not updated' });
  }
});

module.exports = router;
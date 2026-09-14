const dbClient = require('../utils/db');
const bcrypt = require('bcryptjs');
const express = require('express');

const router = express.Router();

// Function to hash a string containing username and password
function hashCredentials(credentials) {
  // Define the number of salt rounds (the cost factor)
  const saltRounds = 10;

  // Generate a salt
  const salt = bcrypt.genSaltSync(saltRounds);

  // Hash the credentials string using the generated salt
  const hashedCredentials = bcrypt.hashSync(credentials, salt);

  return hashedCredentials;
}

// Get all users
router.get('/user', async (req, res) => {
  try {
    const userArray = await dbClient.getUserArray();
    res.status(200).send(userArray);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

// Create a new user
router.post('/user', async (req, res) => {
  try {
    const data = req.body;
    const token = hashCredentials(`${data.username}:${data.password}`);
    const userObj = { username: data.username, password: data.password, token: token, last_message_id: null };

    const response = { token: token };
    const userId = await dbClient.getUser({ username: userObj.username });
    if (userId) {
      response.token = '';
    } else {
      await dbClient.setUser(userObj);
    }

    res.send(response);
  } catch (error) {
    res.status(500).send({ error: 'Failed to create user' });
  }
});

// Check if token is valid
router.post('/user/check-token', async (req, res) => {
  try {
    const token = req.body.token;
    const userId = await dbClient.getUser({ token: token });

    const response = { allowed: 'no' };
    if (userId) {
      response.allowed = 'yes';
    }

    res.send(response);
  } catch (error) {
    res.status(500).send({ error: 'Failed to check token' });
  }
});

// Check if user credentials are valid
router.post('/user/check-user', async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const userData = await dbClient.getUser({ username, password });

    let token = '';
    if (userData) {
      token = userData.token || '';
    }
    const response = { token: token };

    res.send(response);
  } catch (error) {
    res.status(500).send({ error: 'Failed to check user' });
  }
});

// Get user data by token
router.post('/user/get-user-data', async (req, res) => {
  try {
    const token = req.body.token;
    const user = await dbClient.getUser({ token: token });

    if (user) {
      res.send({ userId: user._id, lastMessageId: user.last_message_id });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to get user data' });
  }
});

// Update last message ID for a user
router.post('/user/update-last-message-id', async (req, res) => {
  try {
    const { userId, lastMessageId } = req.body;
    const result = await dbClient.updateUser({ _id: userId }, { last_message_id: lastMessageId });

    if (result.modifiedCount > 0) {
      res.status(200).send({ success: true });
    } else {
      res.status(404).send({ error: 'User not found or lastMessageId not updated' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Failed to update last message ID' });
  }
});

module.exports = router;

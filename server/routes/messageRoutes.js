// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { User, Message, Sequelize } = require('../models');
const { Op } = Sequelize;

// Get all users who sent messages (for admin chat list)
router.get('/users', async (req, res) => {
  try {
    const users = await Message.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('sender')), 'sender']],
    });

    const usernames = users.map(u => u.get('sender'));
    res.json(usernames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get conversation between two users (user1 and user2)
router.get('/conversation', messageController.getConversationBetweenUsers);
// router.delete('/messages/:id', messageController.deleteMessage);
router.delete('/user/:sender', messageController.deleteMessagesBySender); 
router.put('/rename', messageController.renameUserInMessages);


// Send message
router.post('/', messageController.sendMessage);

module.exports = router;

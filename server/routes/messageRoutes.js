  // routes/messageRoutes.js
  const express = require('express');
  const router = express.Router();
  const messageController = require('../controllers/messageController');
  const { User, Message, Sequelize } = require('../models');
  const { Op } = Sequelize;

  // Get all users who sent messages (for admin chat list)
  router.get('/users', async (req, res) => {
  try {
    // Get all users who exist (filter as needed)
    const users = await User.findAll({
      attributes: ['id', 'email'],  // only id and email
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all users who have chatted with the given userId
router.get('/users/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find distinct user IDs who have chatted with userId
    const chatUserIdsRaw = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      attributes: [
        [Sequelize.literal(`DISTINCT CASE WHEN senderId = ${userId} THEN receiverId ELSE senderId END`), 'userId']
      ],
      raw: true
    });

    const chatUserIds = chatUserIdsRaw.map(u => u.userId);

    if (chatUserIds.length === 0) return res.json([]);

    // Fetch full user info for those userIds
    const chatUsers = await User.findAll({
      where: { id: chatUserIds },
      attributes: ['id', 'email', 'username']
    });

    res.json(chatUsers);
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
  router.get('/recent', messageController.getRecentMessages);

  // Send message
  router.post('/', messageController.sendMessage);

  

  module.exports = router;




// controllers/messageController.js
const { Message, Sequelize } = require('../models');
const { Op } = Sequelize;
const db = require('../models');


// Fetch conversation between two users
exports.getConversationBetweenUsers = async (req, res) => {
  const { user1, user2 } = req.query;
  if (!user1 || !user2) return res.status(400).json({ error: 'Missing user1 or user2' });

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { sender: user1, receiver: user2 },
          { sender: user2, receiver: user1 }
        ]
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Send a message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, message } = req.body;

  if (!sender || !receiver || !message) {
    return res.status(400).json({ error: 'Missing sender, receiver, or message' });
  }

  try {
    const newMessage = await Message.create({ sender, receiver, message });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// DELETE a message by ID
exports.deleteMessagesBySender = async (req, res) => {
  const sender = req.params.sender;
  try {
    await Message.destroy({ where: { sender } });
    res.status(200).json({ message: 'Messages deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete messages' });
  }
};


exports.renameUserInMessages = async (req, res) => {
  const { oldUsername, newUsername } = req.body;

  if (!oldUsername || !newUsername) {
    return res.status(400).json({ error: 'oldUsername and newUsername are required' });
  }

  try {
    const [updatedCount] = await db.Message.update(
      { sender: newUsername },
      { where: { sender: oldUsername } }
    );

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'No messages found for the old username' });
    }

    res.json({ message: 'Username updated in messages', updatedCount });
  } catch (err) {
    console.error('Rename user error:', err);
    res.status(500).json({ 
      error: 'Error renaming user in messages', 
      details: err.message || err.toString() 
    });
  }
};

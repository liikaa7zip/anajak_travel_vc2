


// controllers/messageController.js
const { Message, Sequelize } = require('../models');
const { Op } = Sequelize;
const db = require('../models');


// Fetch conversation between two users
exports.getConversationBetweenUsers = async (req, res) => {
  const user1 = parseInt(req.query.user1, 10);
  const user2 = parseInt(req.query.user2, 10);

  if (!user1 || !user2) {
    return res.status(400).json({ error: 'Missing user1 or user2' });
  }

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: user1, receiverId: user2 },
          { senderId: user2, receiverId: user1 },
        ],
      },
      order: [['createdAt', 'ASC']],
    });

    res.json(messages);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendMessage = async (req, res) => {
  const { sender, receiver, senderId, receiverId, message } = req.body;

  if (!sender || !receiver || !senderId || !receiverId || !message) {
    return res.status(400).json({ error: 'Missing sender, receiver, senderId, receiverId, or message' });
  }

  try {
    const newMessage = await Message.create({
      sender,
      receiver,
      senderId,
      receiverId,
      message
    });
    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
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


exports.getRecentMessages = async (req, res) => {
  try {
    // Get recent 10 messages, order by newest first
    const recentMessages = await Message.findAll({
      order: [['createdAt', 'DESC']],
      limit: 7,
    });

    res.json(recentMessages);
  } catch (error) {
    console.error('Error fetching recent messages:', error);
    res.status(500).json({ error: 'Server error fetching recent messages' });
  }
};

// Get unread message counts for each sender
const getUnreadCounts = async (req, res) => {
  try {
    // Group by senderId and receiverId, count unseen messages
    const unreadCounts = await Message.findAll({
      attributes: [
        'senderId',
        'receiverId',
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
      ],
      where: {
        seen: false,
      },
      group: ['senderId', 'receiverId'],
      raw: true,
    });

    res.json(unreadCounts);
  } catch (error) {
    console.error('Error fetching unread counts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark all messages from a sender to this receiver as seen
exports.markMessagesSeen = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!senderId || !receiverId) {
    return res.status(400).json({ error: 'senderId and receiverId are required' });
  }

  try {
    const [updated] = await Message.update(
      { seen: true },
      { where: { senderId, receiverId, seen: false } }
    );

    res.json({ success: true, updated });
  } catch (error) {
    console.error('Error marking messages seen:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getUnreadCounts = getUnreadCounts; 
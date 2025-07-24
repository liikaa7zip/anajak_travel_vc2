// const db = require('../models');
// const Message = db.Message;
// const Sequelize = db.Sequelize;

// exports.getMessagesBetweenUsers = async (req, res) => {
//   const { user1, user2 } = req.query;

//   if (!user1 || !user2) {
//     return res.status(400).json({ message: 'user1 and user2 query params required' });
//   }

//   try {
//     const messages = await Message.findAll({
//       where: {
//         [Sequelize.Op.or]: [
//           { sender: user1, receiver: user2 },
//           { sender: user2, receiver: user1 },
//         ],
//       },
//       order: [['createdAt', 'ASC']],
//     });

//     res.json(messages);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to get messages' });
//   }
// };

// exports.sendMessage = async (req, res) => {
//   const { sender, receiver, content } = req.body;

//   if (!sender || !receiver || !content) {
//     return res.status(400).json({ message: 'sender, receiver, and content are required' });
//   }

//   try {
//     const message = await Message.create({ sender, receiver, message: content });
//     res.status(201).json(message);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Failed to send message' });
//   }
// };


// controllers/messageController.js
const { Message, Sequelize } = require('../models');
const { Op } = Sequelize;

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


// const express = require('express');
// const router = express.Router();
// const db = require('../models');
// const User = db.User;

// // GET /api/users - list all users except admin
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.findAll({
//       where: {
//         username: { [db.Sequelize.Op.not]: 'admin' }
//       },
//       attributes: ['id', 'username', 'email', 'role'] // limit fields if you want
//     });
//     res.json(users);
//   } catch (err) {
//     console.error('Failed to fetch users:', err);
//     res.status(500).json({ error: 'Failed to fetch users' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const { User } = require('../models');
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin,verifyRestaurantOwner,verifyAdminOrRestaurantOwner , } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Admin-only routes
router.post('/admin/create-user', verifyToken, verifyAdmin, userController.adminCreateUser);
router.get('/', verifyToken, verifyAdminOrRestaurantOwner, userController.getAllUsers);
router.put('/admin/users/:id', verifyToken, verifyAdmin, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, verifyAdmin, userController.deleteUser);
router.post('/restaurant-owner/create-user', verifyToken, verifyRestaurantOwner, userController.adminCreateUser);

// Authenticated users can delete their own account (optional)
router.delete('/:id', verifyToken, userController.deleteUser);
router.put('/:id', verifyToken, userController.updateUser);

// Get all users by a specific role
router.get('/by-role/:role', async (req, res) => {
  try {
    const users = await User.findAll({
      where: { role: req.params.role },
      attributes: ['id', 'username', 'email', 'role']
    });
    res.json(users);
  } catch (err) {
    console.error('Error fetching users by role:', err);
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;

const express = require('express');
const router = express.Router();
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

module.exports = router;

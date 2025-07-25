const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Public register (everyone)
router.post('/register', userController.registerUser);

// Login
router.post('/login', userController.loginUser);

// Admin routes protected by auth & admin check
router.post('/admin/create-user', verifyToken, verifyAdmin, userController.adminCreateUser);
router.get('/admin/users', verifyToken, verifyAdmin, userController.getAllUsers);

// router.delete('/admin/users/:id', userController.deleteUser);

// Add other admin routes as needed

module.exports = router;

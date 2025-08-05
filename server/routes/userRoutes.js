const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Admin-only routes
router.post('/admin/create-user', verifyToken, verifyAdmin, userController.adminCreateUser);
router.get('/', verifyToken, verifyAdmin, userController.getAllUsers);
router.put('/admin/users/:id', verifyToken, verifyAdmin, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, verifyAdmin, userController.deleteUser);

// Authenticated users can delete their own account (optional)
router.delete('/:id', verifyToken, userController.deleteUser);
router.put('/:id', verifyToken, userController.updateUser);

module.exports = router;

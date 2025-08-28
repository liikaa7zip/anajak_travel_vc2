const express = require('express');
const router = express.Router();
const { User, Hotel } = require('../models');
const userController = require('../controllers/userController');
const { verifyToken, verifyAdmin,verifyRestaurantOwner,verifyAdminOrRestaurantOwner , } = require('../middlewares/authMiddleware');
const { Op } = require('sequelize');

// Public routes
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// Admin-only routes
router.post('/admin/create-user', verifyToken, verifyAdmin, userController.adminCreateUser);
router.get('/', verifyToken, verifyAdminOrRestaurantOwner, userController.getAllUsers);
router.put('/admin/users/:id', verifyToken, verifyAdmin, userController.updateUser);
router.delete('/admin/users/:id', verifyToken, verifyAdmin, userController.deleteUser);
router.post('/restaurant-owner/create-user', verifyToken, verifyRestaurantOwner, userController.adminCreateUser);
// router.get('/hotels/with-restaurants', userController.getHotelsWithRestaurants);

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

// If using MySQL JSON column
router.get('/hotels/with-restaurants', async (req, res) => {
  try {
    const hotels = await Hotel.findAll();

    // Parse amenities and filter manually
    const filteredHotels = hotels
      .map(h => {
        let amenities = {};
        try {
          amenities = h.amenities ? JSON.parse(h.amenities) : {};
        } catch (e) {
          console.warn('Invalid amenities JSON for hotel', h.id);
        }
        return { ...h.dataValues, amenities };
      })
      .filter(h => h.amenities.hasRestaurant === true);

    res.json(filteredHotels.map(h => ({ id: h.id, name: h.name })));
  } catch (err) {
    console.error('[HOTELS WITH RESTAURANT] Error:', err);
    res.status(500).json({ error: 'Failed to fetch hotels' });
  }
});

module.exports = router;

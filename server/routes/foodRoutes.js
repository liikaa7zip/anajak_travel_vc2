const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const { verifyToken, verifyRestaurantOwner } = require('../middlewares/authMiddleware');

// Get all foods (anyone can see)
router.get('/', foodController.getAllFood);

// Get foods that belong to this restaurant owner's hotel
router.get('/my-foods', verifyToken, verifyRestaurantOwner, foodController.getMyFoods);

// Get foods by locationId
router.get('/by-location/:locationId', foodController.getFoodsByLocation);

// Get food by ID
router.get('/:id', foodController.getFoodById);

// Create food → only restaurant owner
router.post('/', verifyToken, verifyRestaurantOwner, foodController.createFood);

// Update food
router.put('/:id', verifyToken, verifyRestaurantOwner, foodController.updateFood);

// Delete food
router.delete('/:id', verifyToken, verifyRestaurantOwner, foodController.deleteFood);

router.put('/toggle/:id', verifyToken, verifyRestaurantOwner, foodController.toggleActive);

// Route to get foods by hotel
router.get('/by-hotel/:hotelId', foodController.getFoodsByHotel);
module.exports = router;


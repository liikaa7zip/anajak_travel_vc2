const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// Get all foods, optionally filtered by locationId query param
router.get('/', foodController.getAllFood);

// Get foods by locationId (path param)
router.get('/by-location/:locationId', foodController.getFoodsByLocation);

// Get food by ID
router.get('/:id', foodController.getFoodById);

// Create food (expects JSON body with name, price, image (string), locationId)
router.post('/', foodController.createFood);
router.put('/:id', foodController.updateFood)
// Delete food by ID
router.delete('/:id', foodController.deleteFood);

module.exports = router;

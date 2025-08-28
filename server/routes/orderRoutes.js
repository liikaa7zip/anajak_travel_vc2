const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderFoodController'); // correct relative path
const { verifyToken } = require('../middlewares/authMiddleware');


// USER routes
router.post('/', verifyToken, orderController.createOrder);
router.get('/my-orders', verifyToken, orderController.getOrders);
router.put('/:id/cancel', verifyToken, orderController.cancelOrder);

// ADMIN routes
router.get('/', verifyToken, orderController.getRestaurantOrders);
router.put('/:id/complete', verifyToken, orderController.updateRestaurantOrderStatus);
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;

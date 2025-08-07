const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderFoodController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get("/", verifyToken, orderController.getAllOrders); 
router.get('/:id', verifyToken, orderController.getOrderById);
router.post('/', verifyToken, orderController.createOrder);
router.delete('/:id', verifyToken, orderController.cancelOrder);
router.put('/:id', verifyToken, orderController.updateOrder);

module.exports = router;

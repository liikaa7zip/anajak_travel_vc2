const { Order, Food, Hotel, User } = require('../models');

// ======================
// ✅ USER: Create new order
// ======================
exports.createOrder = async (req, res) => {
  try {
    // Find the food to get its restaurant owner
    const food = await Food.findByPk(req.body.foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const newOrder = await Order.create({
      userId: req.body.userId,
      foodId: food.id,
      hotelId: req.body.hotelId,
      customerName: req.body.customerName,
      customerPhone: req.body.customerPhone,
      roomNumber: req.body.roomNumber,
      quantity: req.body.quantity,
      totalPrice: req.body.totalPrice,
      status: req.body.status || "pending",
      restaurantOwnerId: food.restaurantOwnerId  // <<< crucial
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ======================
// ✅ USER: Get logged-in user’s orders
// ======================
exports.getOrders = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const userId = req.user.id;

    const orders = await Order.findAll({
      where: { userId },
      include: [
        { model: Food, attributes: ['id', 'name', 'price', 'image'] },
        { model: Hotel, attributes: ['id', 'name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message });
  }
};


exports.updateRestaurantOrderStatus = async (req, res) => {
  try {
    // Only restaurant owners can complete orders
    if (!req.user || req.user.role !== 'restaurant_owner') {
      return res.status(403).json({ message: 'Forbidden: Restaurant owner only' });
    }

    const orderId = req.params.id;

    // Fetch the order along with its food info
    const order = await Order.findOne({
      where: { id: orderId },
      include: [{ model: Food, attributes: ['id', 'name', 'image'] }],
    });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Check if this order belongs to the logged-in restaurant owner
    if (order.restaurantOwnerId !== req.user.id) {
      return res.status(403).json({ message: 'Not your order' });
    }

    // Only allow completing pending orders
    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be completed' });
    }

    order.status = 'completed';
    await order.save();

    res.status(200).json({ message: 'Order completed', order });
  } catch (err) {
    console.error('Error updating order status:', err);
    res.status(500).json({ message: 'Failed to update order', error: err.message });
  }
};

// USER cancel order
exports.cancelOrder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const orderId = req.params.id;

    const order = await Order.findOne({ where: { id: orderId } });

    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Allow user to cancel their own pending order
    if (req.user.role === 'user' && order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not your order' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ message: 'Order cannot be cancelled' });
    }

    order.status = 'cancelled';
    await order.save();

    res.status(200).json({ message: 'Order cancelled', order });
  } catch (err) {
    console.error('Error cancelling order:', err);
    res.status(500).json({ message: 'Failed to cancel order', error: err.message });
  }
};


// Fetch restaurant orders
exports.getRestaurantOrders = async (req, res) => {
  try {
    if (!req.user || req.user.role !== 'restaurant_owner') {
      return res.status(403).json({ message: 'Forbidden: Restaurant owner only' });
    }

    const orders = await Order.findAll({
      where: { restaurantOwnerId: req.user.id },
      include: [{ model: Food, attributes: ['id', 'name', 'image'] }],
      order: [['createdAt', 'DESC']],
    });

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching restaurant orders:', err);
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};


// DELETE /api/orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const orderId = req.params.id;

    // Fetch the order first
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Only allow:
    // - restaurant owner to delete their own completed/cancelled orders
    // - user to delete their own cancelled orders (optional)
    if (req.user.role === 'restaurant_owner' && order.restaurantOwnerId !== req.user.id) {
      return res.status(403).json({ message: 'Not your order' });
    }

    if (req.user.role === 'user' && order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not your order' });
    }

    // Only delete orders that are completed or cancelled
    if (!['completed','cancelled'].includes(order.status)) {
      return res.status(400).json({ message: 'Only completed or cancelled orders can be deleted' });
    }

    await order.destroy();

    res.status(200).json({ message: 'Order deleted successfully' });

  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(500).json({ message: 'Failed to delete order', error: err.message });
  }
};

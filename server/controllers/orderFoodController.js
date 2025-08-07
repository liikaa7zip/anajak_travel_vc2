const { Order, Food, OrderFoodItem } = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;

    const queryOptions = {
      include: [
        {
          model: Food,
          through: { model: OrderFoodItem },
        },
      ],
      order: [['createdAt', 'DESC']],
    };

    // ✅ If normal user → filter by userId
    if (role !== 'restaurant_owner') {
      queryOptions.where = { userId };
    }

    const orders = await Order.findAll(queryOptions);

    res.json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};




exports.createOrder = async (req, res) => {
  try {
    console.log('Received order:', req.body);
    console.log('Authenticated user:', req.user);

    const { customerName, items } = req.body;
    if (!req.user || !req.user.id) throw new Error('User not authenticated');

    const userId = req.user.id;

    let totalPrice = 0;

    for (const item of items) {
      console.log('Fetching food with ID:', item.foodId);
      const food = await Food.findByPk(item.foodId);
      if (!food) throw new Error(`Food not found: ID ${item.foodId}`);
      totalPrice += food.price * item.quantity;
    }

    const order = await Order.create({ customerName, userId, totalPrice });
    console.log('Order created:', order);

    for (const item of items) {
      await OrderFoodItem.create({
        orderId: order.id,
        foodId: item.foodId,
        quantity: item.quantity,
      });
    }

    res.status(201).json({ message: 'Order created', orderId: order.id });

  } catch (error) {
    console.error('❌ Order creation failed:', error);
    res.status(500).json({ error: 'Order creation failed', details: error.message });
  }
};



exports.getOrderById = async (req, res) => {
  try {
    const id = req.params.id;

    const order = await Order.findByPk(id, {
      include: [{
        model: Food,
        attributes: ['id', 'name', 'price', 'image'],
        through: {
          attributes: ['quantity'],
        },
      }]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};


exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    const { customerName, items } = req.body;
    if (!customerName || !items || !items.length) {
      return res.status(400).json({ error: 'Invalid order data' });
    }

    let totalPrice = 0;
    for (const item of items) {
      const food = await Food.findByPk(item.foodId);
      if (!food) return res.status(400).json({ error: `Food ID ${item.foodId} not found` });
      totalPrice += food.price * item.quantity;
    }

    await order.update({ customerName, totalPrice });

    // Delete old items
    await OrderFoodItem.destroy({ where: { orderId: order.id } });

    // Insert new items
    for (const item of items) {
      await OrderFoodItem.create({
        orderId: order.id,
        foodId: item.foodId,
        quantity: item.quantity,
      });
    }

    res.json({ message: 'Order updated', orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling order', error: err.message });
  }
};


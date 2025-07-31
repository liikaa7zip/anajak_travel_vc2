const { Order, Food, OrderFoodItem } = require('../models');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: {
        model: Food,
        through: { attributes: ['quantity'] },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.createOrder = async (req, res) => {
  try {
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

    const order = await Order.create({ customerName, totalPrice });

    for (const item of items) {
      await OrderFoodItem.create({
        orderId: order.id,
        foodId: item.foodId,
        quantity: item.quantity,
      });
    }

    res.status(201).json({ message: 'Order created', orderId: order.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: {
        model: Food,
        through: { attributes: ['quantity'] },a
      },
    });
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
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

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await OrderFoodItem.destroy({ where: { orderId: order.id } });
    await order.destroy();

    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

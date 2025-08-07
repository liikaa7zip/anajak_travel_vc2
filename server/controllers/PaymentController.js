const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  try {
    const { bookingId, bookingType, amount, method, cardName } = req.body;

    if (!bookingId || !bookingType || !amount || !method || !cardName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const payment = await Payment.create({
      bookingId,
      bookingType,
      amount,
      method,
      cardName,
    });

    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

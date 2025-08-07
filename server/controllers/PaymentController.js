const { Payment } = require('../models');

exports.createPayment = async (req, res) => {
  console.log('Payment request body:', req.body); // Log full body

  const { bookingId, bookingType, amount, method, cardName } = req.body;

  if (!bookingId || !bookingType || !amount || !method || !cardName) {
    console.log('Missing required fields:', { bookingId, bookingType, amount, method, cardName });
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const payment = await Payment.create({ bookingId, bookingType, amount, method, cardName });
    console.log('Payment created:', payment);
    res.status(201).json({ success: true, payment });
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

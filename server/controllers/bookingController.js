const { Booking, User } = require('../models');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [{ model: User, attributes: ['username'] }],
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['username'] }],
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const {
      UserId,
      depart,
      arrive,
      type,
      price,
      date,
      email,
      timeOfDay,
      seatNumbers,
    } = req.body;

    if (!UserId || !depart || !arrive || !type || !price || !date || !email || !timeOfDay) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newBooking = await Booking.create({
      UserId,
      depart,
      arrive,
      type,
      price,
      date,
      email,
      timeOfDay,
      seatNumbers,
    });

    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};

// Cancel booking by ID
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking', error: error.message });
  }
};

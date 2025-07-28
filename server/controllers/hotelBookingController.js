const { HotelBooking, Hotel } = require('../models');

// GET all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.findAll({ include: Hotel });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};

// GET booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await HotelBooking.findByPk(req.params.id, { include: Hotel });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching booking', error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    console.log('Received booking request body:', req.body);

    const { hotelId, userId, checkInDate, checkOutDate, guests, totalPrice } = req.body;

    if (!hotelId || !userId || !checkInDate || !checkOutDate || !guests || !totalPrice) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const newBooking = await HotelBooking.create({
      hotelId,
      userId,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice,
    });

    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(400).json({ message: 'Failed to create booking', error: err.message });
  }
};



// DELETE booking
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await HotelBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
};

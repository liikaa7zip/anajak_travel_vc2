const { BoatBooking, User } = require('../models');

exports.createBooking = async (req, res) => {
  try {
    const { boatType } = req.body;
    let price = 0;
    switch (boatType) {
      case 'Speed Boat':
        price = 50;
        break;
      case 'Ferry':
        price = 30;
        break;
      case 'Longtail Boat':
        price = 20;
        break;
      default:
        price = 0;
    }

    const userId = req.body.userId || 1; // Replace with auth user ID when available

    const booking = await BoatBooking.create({
      ...req.body,
      price,
      userId,
    });

    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create booking', detail: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BoatBooking.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

exports.getBookingsByUserId = async (req, res) => {
  try {
    const bookings = await BoatBooking.findAll({
      where: { userId: req.params.userId },
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });
    res.json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// NOTE: function name fixed here to lowercase 'b' to match your route
exports.getboatBookingById = async (req, res) => {
  try {
    const booking = await BoatBooking.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] }
      ]
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteboatBooking = async (req, res) => {
  try {
    const deleted = await BoatBooking.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};

exports.cancelboatBooking = async (req, res) => {
  try {
    const booking = await BoatBooking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (booking.status === 'cancelled') return res.status(400).json({ message: 'Booking already cancelled' });

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

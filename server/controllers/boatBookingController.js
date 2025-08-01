const BoatBooking = require('../models/BoatBooking');

exports.createBooking = async (req, res) => {
  try {
    const { boatType } = req.body;
    // Auto price logic based on boatType
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

    // Add userId for example, here set to 1 or get from auth middleware
    const userId = req.body.userId || 1;

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
    const bookings = await BoatBooking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Get a single booking by ID
exports.getboatBookingById = async (req, res) => {
  try {
    const booking = await BoatBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a booking by ID
exports.deleteboatBooking = async (req, res) => {
  try {
    const deleted = await BoatBooking.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Failed to delete booking' });
  }
};

// Cancel a booking by ID (update status)
exports.cancelboatBooking = async (req, res) => {
  try {
    const booking = await BoatBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Failed to cancel booking' });
  }
};

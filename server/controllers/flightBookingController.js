const db = require('../models');
const FlightBooking = db.FlightBooking;

exports.createFlightBooking = async (req, res) => {
  try {
    const {
      origin,
      destination,
      date,
      airline,
      classType,
      passengers,
      passengerName,
      email
    } = req.body;

    if (!origin || !destination || !date || !airline || !classType || !passengers || !passengerName || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newBooking = await FlightBooking.create({
      origin,
      destination,
      date,
      airline,
      classType,
      passengers,
      passengerName,
      email
    });

    res.status(201).json(newBooking);
  } catch (err) {
    console.error('Error creating flight booking:', err);
    res.status(500).json({ message: 'Server error while creating booking.' });
  }
};

exports.getAllFlightBookings = async (req, res) => {
  try {
    const bookings = await FlightBooking.findAll();
    res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error while fetching bookings.' });
  }
};

exports.getFlightBookingById = async (req, res) => {
  try {
    const booking = await FlightBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (err) {
    console.error('Error fetching booking:', err);
    res.status(500).json({ message: 'Server error while fetching booking' });
  }
};

exports.deleteFlightBooking = async (req, res) => {
  try {
    const booking = await FlightBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await booking.destroy();
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error('Error deleting booking:', err);
    res.status(500).json({ message: 'Server error while deleting booking' });
  }
};
exports.cancelFlightBooking = async (req, res) => {
  try {
    const booking = await FlightBooking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Server error while cancelling booking' });
  }
};



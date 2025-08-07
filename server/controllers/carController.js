const db = require('../models');
const { Seat, Booking } = require('../models');

exports.getAllCars = async (req, res) => {
  try {
    const cars = await db.Car.findAll();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
};


exports.getSeatsByCar = async (req, res) => {
  try {
    const carId = req.params.carId;

    // Fetch all bookings for this car that are confirmed, for example:
    const bookings = await Booking.findAll({
      where: { carId, status: 'confirmed' },
    });

    // Collect all booked seats
    const bookedSeats = bookings.reduce((acc, booking) => {
      const seats = JSON.parse(booking.seatNumbers); // Assuming seatNumbers stored as JSON string
      return acc.concat(seats);
    }, []);

    res.json({ bookedSeats });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
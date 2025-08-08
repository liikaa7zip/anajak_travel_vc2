const { Booking, User, Car } = require('../models');

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Car, attributes: ['name', 'plateNumber'] },
      ],
    });
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error.message, error.stack);
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

async function isSeatsAvailable(carId, seatNumbers, date) {
  const bookings = await Booking.findAll({
    where: {
      carId,
      date,
      status: 'confirmed',
    }
  });

  const bookedSeats = bookings.reduce((acc, booking) => {
    const seats = JSON.parse(booking.seatNumbers);
    return acc.concat(seats);
  }, []);

  return seatNumbers.every(seat => !bookedSeats.includes(seat));
}

// Create booking
exports.createBooking = async (req, res) => {
  try {
    // Destructure UserId from req.body, rename to userId internally
    const {
      UserId: userId,
      depart,
      arrive,
      type,
      timeOfDay,
      seatNumbers,
      price,
      date,
      email,
      status,
      carId,
      time,
    } = req.body;

    // DEBUG: Check the input
    console.log('userId being sent:', userId);
    console.log('seatNumbers being sent:', seatNumbers);

    // Validate seatNumbers is an array
    if (!Array.isArray(seatNumbers)) {
      return res.status(400).json({
        message: 'seatNumbers must be an array',
      });
    }

    // 1. Find existing bookings for same car, date, and timeOfDay
    const existingBookings = await Booking.findAll({
      where: {
        carId,
        date,
        timeOfDay,
      },
    });

    // 2. Collect already booked seats
    let bookedSeats = [];
    existingBookings.forEach((booking) => {
      let seats = [];
      try {
        seats = typeof booking.seatNumbers === 'string'
          ? JSON.parse(booking.seatNumbers)
          : booking.seatNumbers;
      } catch (err) {
        console.error('Failed to parse seatNumbers:', booking.seatNumbers);
      }

      if (Array.isArray(seats)) {
        bookedSeats.push(...seats);
      }
    });

    // 3. Check for overlaps
    const conflictSeats = seatNumbers.filter((seat) =>
      bookedSeats.includes(seat)
    );

    if (conflictSeats.length > 0) {
      return res.status(400).json({
        message: 'Some seats are already booked.',
        conflictSeats,
      });
    }

    // 4. Save new booking (convert seatNumbers to JSON string)
    const newBooking = await Booking.create({
      UserId: userId,  // use correct variable here
      depart,
      arrive,
      type,
      timeOfDay,
      seatNumbers: JSON.stringify(seatNumbers),
      price,
      date,
      email,
      status,
      carId,
      time,
    });

    res.status(201).json({
      message: 'Booking successful',
      data: newBooking,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
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


// GET /api/bookings/booked-seats?carId=1&date=2025-08-07&timeOfDay=day
exports.getBookedSeats = async (req, res) => {
  try {
    const { carId, date, timeOfDay } = req.query;

    if (!carId || !date || !timeOfDay) {
      return res.status(400).json({ message: 'Missing carId, date, or timeOfDay' });
    }

    const bookings = await Booking.findAll({
      where: {
        carId,
        date,
        timeOfDay,
        status: 'confirmed'
      }
    });

    const allBookedSeats = bookings.reduce((acc, booking) => {
      const seats = JSON.parse(booking.seatNumbers || '[]');
      return acc.concat(seats);
    }, []);

    return res.json({ bookedSeats: allBookedSeats });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch booked seats', error: error.message });
  }
};

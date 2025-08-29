const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { HotelBooking, Room } = require('../models');
const hotelBookingController = require('../controllers/hotelBookingController');
const { verifyHotelOwner,verifyToken} = require('../middlewares/authMiddleware');

// --------------------
// Booking Routes
// --------------------

// Get all bookings (admin or debug purposes)
router.get('/', hotelBookingController.getAllBookings);

router.get('/my-bookings', verifyToken, hotelBookingController.getMyBookings);

// Get booking stats
router.get('/stats', hotelBookingController.getBookingStats);

// Get single booking by ID
router.get('/:id', hotelBookingController.getBookingById);

// Create new booking
router.post('/', verifyToken, hotelBookingController.createBooking);


// Update booking status
router.put('/:id/status', hotelBookingController.updateBookingStatus);

// Cancel booking
router.delete('/:id', hotelBookingController.cancelBooking);

// Get bookings for a specific user
// routes/hotelBooking.js
router.get('/users', verifyToken, hotelBookingController.getUserBookings);


// Get bookings for a specific hotel
router.get('/hotel/:hotelId', hotelBookingController.getBookingsByHotel);

// --------------------
// Rooms Routes
// --------------------

// Get all available rooms for a hotel (exclude already booked)
router.get('/hotels/:hotelId/rooms', async (req, res) => {
  try {
    const bookedRooms = await HotelBooking.findAll({
      where: { hotelId: req.params.hotelId },
      attributes: ['roomId'],
      // Only consider pending or confirmed bookings
      where: {
        hotelId: req.params.hotelId,
        status: { [Op.in]: ['pending', 'confirmed'] }
      }
    });

    const bookedRoomIds = bookedRooms.map(b => b.roomId);

    const rooms = await Room.findAll({
      where: {
        hotelId: req.params.hotelId,
        id: { [Op.notIn]: bookedRoomIds },
        status: 'available'
      }
    });

    res.json(rooms);
  } catch (err) {
    console.error('Error fetching available rooms:', err);
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

module.exports = router;

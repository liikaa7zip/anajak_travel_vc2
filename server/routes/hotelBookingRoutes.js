// Enhanced Hotel Booking Routes
const express = require('express');
const router = express.Router();
const hotelBookingController = require('../controllers/hotelBookingController');


// Public routes (with optional authentication)
router.get('/', hotelBookingController.getAllBookings);
router.get('/stats', hotelBookingController.getBookingStats);   
router.get('/:id', hotelBookingController.getBookingById);
router.post('/', hotelBookingController.createBooking);
router.put('/:id/status', hotelBookingController.updateBookingStatus);
router.delete('/:id', hotelBookingController.cancelBooking);
router.get('/user/:userId', hotelBookingController.getUserBookings);
router.get('/', hotelBookingController.getAllBookings);
router.get('/hotel/:hotelId', hotelBookingController.getBookingsByHotel);
router.get('/hotels/:hotelId/rooms', async (req, res) => {
  try {
    // find all booked roomIds
    const bookedRooms = await HotelBooking.findAll({
      where: { hotelId: req.params.hotelId },
      attributes: ['roomId']
    });

    const bookedRoomIds = bookedRooms.map(b => b.roomId);

    // get only rooms NOT booked
    const rooms = await Room.findAll({
      where: {
        hotelId: req.params.hotelId,
        id: { [Op.notIn]: bookedRoomIds }, // exclude booked
        status: 'available'
      }
    });

    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rooms' });
  }
});

module.exports = router;

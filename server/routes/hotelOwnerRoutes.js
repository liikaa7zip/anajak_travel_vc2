// Enhanced Hotel Owner Routes
const router = require('express').Router();
const controller = require('../controllers/HotelOwnerController');
const { verifyHotelOwner,verifyToken} = require('../middlewares/authMiddleware');

// Apply hotel owner verification middleware to all routes
router.use(verifyToken);
router.use(verifyHotelOwner);



// Dashboard routes
router.get('/dashboard', controller.getDashboard);

// Housekeeping routes
router.get('/housekeeping', controller.getHousekeepingStatus);
router.post('/housekeeping/assign', controller.assignHousekeeper);
router.put('/housekeeping/:id', controller.updateCleaningStatus);


// Room management routes
router.get('/rooms', controller.getRooms);
router.post('/rooms', controller.createRoom);
router.get('/rooms/:id', controller.getRoomById);
router.put('/rooms/:id', controller.updateRoom);
router.delete('/rooms/:id', controller.deleteRoom);
router.put('/rooms/:id/availability', controller.setRoomAvailability);

// Room categories
router.get('/room-categories', controller.getRoomCategories);
router.post('/room-categories', controller.createRoomCategory);

// Reservation management routes
router.get('/reservations', controller.getReservations);
router.put('/reservations/:id', controller.updateReservationStatus);

// Booking overview routes
router.get('/booking-calendar', controller.getBookingCalendar);
router.get('/room-occupancy', controller.getRoomOccupancyTimeline);
router.get('/booking-report', controller.downloadBookingReport);

module.exports = router;

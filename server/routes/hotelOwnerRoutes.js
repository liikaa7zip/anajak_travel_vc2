// Enhanced Hotel Owner Routes
const router = require('express').Router();
const controller = require('../controllers/hotelOwnerController');
const { verifyHotelOwner,verifyToken} = require('../middlewares/authMiddleware');
const multer = require("multer");
const path = require("path");

// Apply hotel owner verification middleware to all routes
router.use(verifyToken);
router.use(verifyHotelOwner);



// Dashboard routes
router.get('/dashboard', controller.getDashboard);

// Housekeeping routes
router.get('/housekeeping', controller.getHousekeepingStatus);                
router.get('/housekeeping/:id', controller.getHousekeepingById);               
router.post('/housekeeping/assign', controller.assignHousekeeper);            
router.put('/housekeeping/:id', controller.updateCleaningStatus);      
        
// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });
// Room management routes
router.get('/rooms', controller.getRooms);
router.get('/rooms/:id', controller.getRoomById);
router.delete('/rooms/:id', controller.deleteRoom);
router.put('/rooms/:id/availability', controller.setRoomAvailability);
router.post("/rooms", upload.array("images", 10), controller.createRoom); // allow multiple images
router.put("/rooms/:id", upload.array("images", 10), controller.updateRoom);

// Room categories
router.get('/room-categories', verifyToken, verifyHotelOwner, controller.getRoomCategories);
router.post('/room-categories', verifyToken, verifyHotelOwner, controller.createRoomCategory);


// Reservation management routes
router.get('/reservations', controller.getReservations);
router.put('/reservations/:id', controller.updateReservationStatus);

// Booking overview routes
router.get('/booking-calendar', controller.getBookingCalendar);
router.get('/room-occupancy', controller.getRoomOccupancyTimeline);
router.get('/booking-report', controller.downloadBookingReport);

router.get('/:hotelId/rooms', controller.getRoomsForUsers);
router.put('/:id', controller.updateRoomStatus);

module.exports = router;

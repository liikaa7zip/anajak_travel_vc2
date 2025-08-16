const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware.js');
const adminHotelController = require('../controllers/adminHotelController.js');

// Protect all admin hotel routes with verifyToken and verifyAdmin
router.use(verifyToken, verifyAdmin);

router.get('/', adminHotelController.getAllHotels);
router.get('/:id', adminHotelController.getHotelById);
router.post('/', adminHotelController.createHotel);
router.put('/:id', adminHotelController.updateHotel);
router.delete('/:id', adminHotelController.deleteHotel);

module.exports = router;

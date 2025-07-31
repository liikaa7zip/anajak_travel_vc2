const express = require('express');
const router = express.Router();
const controller = require('../controllers/itineraryController');

router.post('/', controller.createItinerary);
router.get('/', controller.getAllItineraries);
router.get('/:id', controller.getItinerary);
router.put('/:id', controller.updateItinerary);
router.delete('/:id', controller.deleteItinerary);

module.exports = router;

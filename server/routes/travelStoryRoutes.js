const express = require('express');
const router = express.Router();
const travelStoryController = require('../controllers/travelStoryController');

router.get('/story/:id', travelStoryController.getPublicStory);

module.exports = router;

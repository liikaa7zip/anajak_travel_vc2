const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');
const upload = require('../middlewares/upload');

router.get('/', foodController.getAllFood);
router.get('/:id', foodController.getFoodById)

// ✅ Correct way to upload image
// router.post('/', upload.single('image'), foodController.createFood);
// routes/foodRoutes.js
router.get('/by-location/:locationId', foodController.getFoodsByLocation);



module.exports = router;

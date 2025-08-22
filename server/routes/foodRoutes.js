const express = require('express');
const multer = require("multer");
const path = require("path");
const router = express.Router();
const foodController = require('../controllers/foodController');
const { verifyToken, verifyRestaurantOwner } = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Get all foods (anyone can see)
router.get('/', foodController.getAllFood);

// Get foods that belong to this restaurant owner's hotel
router.get('/my-foods', verifyToken, verifyRestaurantOwner, foodController.getMyFoods);

// Get foods by locationId
router.get('/by-location/:locationId', foodController.getFoodsByLocation);

// Get food by ID
router.get('/:id', foodController.getFoodById);

// Create food (restaurant owner) with file upload
router.post("/", verifyToken, verifyRestaurantOwner, upload.single("file"), foodController.createFood);

// Update food with optional file upload
router.put("/:id", verifyToken, verifyRestaurantOwner, upload.single("file"), foodController.updateFood);


// Delete food
router.delete('/:id', verifyToken, verifyRestaurantOwner, foodController.deleteFood);

router.put('/toggle/:id', verifyToken, verifyRestaurantOwner, foodController.toggleActive);

// Route to get foods by hotel
router.get('/by-hotel/:hotelId', foodController.getFoodsByHotel);

router.put("/top-pick/:id", verifyToken, foodController.toggleTopPick);
module.exports = router;


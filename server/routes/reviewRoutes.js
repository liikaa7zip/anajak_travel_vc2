const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares/authMiddleware');
const reviewController = require('../controllers/reviewController');

router.get("/", reviewController.getAllReviews);
router.post('/', verifyToken, reviewController.createReview);


module.exports = router;

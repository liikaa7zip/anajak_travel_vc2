const { Review, User } = require('../models');

// controllers/reviewController.js
exports.createReview = async (req, res) => {
  try {
    const { userId, rating, comment, images } = req.body;

    const review = await Review.create({
      userId,
      rating,
      comment,
      // ✅ always save as JSON string
      images: JSON.stringify(images || [])
    });

    res.status(201).json({
      id: review.id,
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
      images: images || [],
      createdAt: review.createdAt,
      updatedAt: review.updatedAt
    });
  } catch (err) {
    console.error("❌ Error creating review:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// controllers/reviewController.js
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "username", "email"]
        }
      ]
    });

    const formatted = reviews.map(r => ({
      id: r.id,
      userId: r.userId,
      rating: r.rating,
      comment: r.comment,
      // ✅ ensure images is always an array
      images: typeof r.images === "string" ? JSON.parse(r.images) : r.images || [],
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      user: r.user
        ? {
            id: r.user.id,
            username: r.user.username,
            email: r.user.email
          }
        : null
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching reviews:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


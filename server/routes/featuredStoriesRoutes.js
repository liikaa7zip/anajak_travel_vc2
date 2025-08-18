const express = require("express");
const multer = require("multer");
const path = require("path");
const featuredStoriesController = require("../controllers/featuredStoriesController");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", featuredStoriesController.getAll);
router.get("/:id", featuredStoriesController.getById);
router.post("/", upload.single("image"), featuredStoriesController.create);
router.put("/:id", upload.single("image"), featuredStoriesController.update);
router.delete("/:id", featuredStoriesController.delete);

module.exports = router;

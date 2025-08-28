const express = require("express");
const multer = require("multer");
const path = require("path");
const galleryPhotosController = require("../controllers/galleryPhotosController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/", galleryPhotosController.getAll);
router.get("/:id", galleryPhotosController.getById);
router.post("/", upload.single("image"), galleryPhotosController.create);
router.put("/:id", upload.single("image"), galleryPhotosController.update);
router.delete("/:id", galleryPhotosController.delete);

module.exports = router;

const { GalleryPhoto } = require("../models"); // adjust if your model name differs

// GET all
exports.getAll = async (req, res) => {
  try {
    const photos = await GalleryPhoto.findAll();

    console.log("Raw photos from DB:", photos.map(p => p.dataValues));

    const photosWithUrl = photos.map(photo => {
  // Remove any leading slash in photo.image
  const imageFile = photo.image.startsWith('/') ? photo.image.slice(1) : photo.image;
  const url = photo.image ? `http://localhost:5000/${imageFile}` : null;
  console.log("Photo URL generated:", url);
  return {
    ...photo.dataValues,
    image: url
  };
});


    res.json(photosWithUrl);
  } catch (err) {
    console.error("Error fetching gallery photos:", err);
    res.status(500).json({ error: 'Failed to fetch gallery photos' });
  }
};


// GET by ID
exports.getById = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: "Not found" });
    res.json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    console.log("Incoming file:", req.file);   // <-- log uploaded file
    console.log("Incoming body:", req.body);

    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;

    const newPhoto = await GalleryPhoto.create({ title, description, image });

    console.log("Saved photo:", newPhoto);

    res.status(201).json(newPhoto);
  } catch (err) {
    console.error("Error creating photo:", err);
    res.status(500).json({ error: "Failed to save photo" });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const { title, description } = req.body;
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: "Not found" });

    if (req.file) {
      photo.image = `/uploads/${req.file.filename}`;
    }
    photo.title = title;
    photo.description = description;

    await photo.save();
    res.json(photo);
  } catch (err) {
    console.error("Error updating gallery photo:", err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.delete = async (req, res) => {
  try {
    const photo = await GalleryPhoto.findByPk(req.params.id);
    if (!photo) return res.status(404).json({ error: "Not found" });

    // Optional: delete the file from uploads folder
    if (photo.image) {
      const fs = require("fs");
      const path = require("path");
      const filePath = path.join(__dirname, "..", photo.image);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await photo.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Error deleting gallery photo:", err);
    res.status(500).json({ error: err.message });
  }
};

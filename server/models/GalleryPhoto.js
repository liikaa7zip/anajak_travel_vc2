const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const GalleryPhoto = sequelize.define('GalleryPhoto', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: true, // optional; set to false if required
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'gallery_photos',
  timestamps: false,
});

module.exports = GalleryPhoto;

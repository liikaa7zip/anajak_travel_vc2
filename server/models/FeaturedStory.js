const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const FeaturedStory = sequelize.define('FeaturedStory', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'featured_stories',
  timestamps: false,
});

module.exports = FeaturedStory;

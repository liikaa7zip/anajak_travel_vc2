const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Itinerary = sequelize.define('Itinerary', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  activities: {
    type: DataTypes.JSON
  }
});

module.exports = Itinerary;

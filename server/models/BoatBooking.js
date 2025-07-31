const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const BoatBooking = sequelize.define('BoatBooking', {
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  boatType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  passengerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'confirmed' // default status when booking is created
}
});

module.exports = BoatBooking;

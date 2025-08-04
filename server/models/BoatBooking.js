// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

module.exports = (sequelize, DataTypes) => {
const BoatBooking = sequelize.define('BoatBooking', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'confirmed',
  },
});
  return BoatBooking;
};
// module.exports = BoatBooking;

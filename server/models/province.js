'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Province = sequelize.define('Province', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'provinces',
  timestamps: true,
});

module.exports = Province;
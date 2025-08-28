// models/role.js
'use strict';
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.ENUM('admin', 'user', 'restaurant_owner', 'hotel_owner', 'transport_owner'),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  return Role;
};

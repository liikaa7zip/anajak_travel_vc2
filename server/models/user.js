// // server/models/user.js
// 'use strict';
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../config/db');

// const User = sequelize.define('User', {
//   username: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   role: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     defaultValue: 'student'
//   }
// }, {
//   tableName: 'users',
//   timestamps: true
// });

// module.exports = User;

// server/models/user.js
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'user', 'restaurant owner', 'food owner'),
    allowNull: false,
    defaultValue: 'user',  // changed default here
  },
}, {
  tableName: 'users',
  timestamps: true,
})

module.exports = User


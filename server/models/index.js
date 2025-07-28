// // server/models/index.js
// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const basename = path.basename(__filename);
// const db = {};

// const sequelize = require('../config/db');

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file)); 
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Initialize Sequelize and DB object
const db = {
  Sequelize,
  sequelize,
};

// Import models
db.User = require('./user')(sequelize, DataTypes);
db.Location = require('./location')(sequelize, DataTypes);
db.Hotel = require('./hotel')(sequelize, DataTypes);
db.HotelBooking = require('./hotelBooking')(sequelize, DataTypes);

// Define relationships

// User ↔ HotelBooking
db.User.hasMany(db.HotelBooking, { foreignKey: 'userId' });
db.HotelBooking.belongsTo(db.User, { foreignKey: 'userId' });

// Hotel ↔ HotelBooking
db.Hotel.hasMany(db.HotelBooking, { foreignKey: 'hotelId' });
db.HotelBooking.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// Location ↔ Hotel
db.Location.hasMany(db.Hotel, { foreignKey: 'locationId' });
db.Hotel.belongsTo(db.Location, { foreignKey: 'locationId' });

module.exports = db;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
<<<<<<< HEAD
=======

const User = require('./user');
const Booking = require('./booking'); 
=======
const UserModel = require('./user');

>>>>>>> master


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
<<<<<<< HEAD
=======

db.User = User;
db.Booking = Booking;
=======
db.User = UserModel(sequelize);
>>>>>>> master

// Import models once, passing (sequelize, DataTypes)
db.User = require('./user')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);

// Define associations here if needed
// e.g. db.User.hasMany(db.Message, { foreignKey: 'sender' });


module.exports = db;

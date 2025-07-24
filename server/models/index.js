const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Initialize db object
const db = {};

// Attach sequelize instance and class
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import all models
db.User = require('./user')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);

// Define associations if needed
// For example:
// db.User.hasMany(db.Message, { foreignKey: 'sender' });
// db.Message.belongsTo(db.User, { foreignKey: 'sender' });
const Message = require('./message')(sequelize, Sequelize.DataTypes);
db.Message = Message;


module.exports = db;

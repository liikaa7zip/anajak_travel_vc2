const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models once, passing (sequelize, DataTypes)
db.User = require('./user')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);

// Define associations here if needed
// e.g. db.User.hasMany(db.Message, { foreignKey: 'sender' });

module.exports = db;

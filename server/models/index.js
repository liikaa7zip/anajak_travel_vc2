const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models (pass sequelize and DataTypes)
db.User = require('./user')(sequelize, DataTypes);
db.Booking = require('./booking')(sequelize, DataTypes);
db.Location = require('./location')(sequelize, DataTypes);
db.Hotel = require('./hotel')(sequelize, DataTypes);
db.HotelBooking = require('./hotelBooking')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);
db.Food = require('./food')(sequelize, DataTypes);
db.Order = require('./orders')(sequelize, DataTypes);
db.OrderFoodItem = require('./orderFoodItem')(sequelize, DataTypes);
const upload = require('../middlewares/upload');

// === Define Relationships === //

// User ↔ HotelBooking
db.User.hasMany(db.HotelBooking, { foreignKey: 'userId' });
db.HotelBooking.belongsTo(db.User, { foreignKey: 'userId' });

// Hotel ↔ HotelBooking
db.Hotel.hasMany(db.HotelBooking, { foreignKey: 'hotelId' });
db.HotelBooking.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// Location ↔ Hotel
db.Location.hasMany(db.Hotel, { foreignKey: 'locationId' });
db.Hotel.belongsTo(db.Location, { foreignKey: 'locationId' });

// Food ↔ Order through OrderFoodItem
db.Order.belongsToMany(db.Food, { through: db.OrderFoodItem, foreignKey: 'orderId', otherKey: 'foodId' });
db.Food.belongsToMany(db.Order, { through: db.OrderFoodItem, foreignKey: 'foodId', otherKey: 'orderId' });

db.Location.hasMany(db.Food, { foreignKey: 'locationId' });
db.Food.belongsTo(db.Location, { foreignKey: 'locationId' });

db.Booking = require('./booking')(sequelize, Sequelize.DataTypes);
// Optional: Add User ↔ Message association if needed
// db.User.hasMany(db.Message, { foreignKey: 'sender' });
// db.User.hasMany(db.Message, { foreignKey: 'receiver' });

module.exports = db;

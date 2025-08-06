const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models (pass sequelize and DataTypes)
db.User = require('./user')(sequelize, DataTypes);
db.Booking = require('./booking')(sequelize, DataTypes);
db.FlightBooking = require('./FlightBooking')(sequelize, Sequelize.DataTypes);
db.Location = require('./location')(sequelize, DataTypes);
db.Hotel = require('./hotel')(sequelize, DataTypes);
db.HotelBooking = require('./hotelBooking')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);
db.Food = require('./food')(sequelize, DataTypes);
db.Order = require('./orders')(sequelize, DataTypes);
db.OrderFoodItem = require('./orderFoodItem')(sequelize, DataTypes);
const upload = require('../middlewares/upload');
db.BoatBooking = require('./BoatBooking')(sequelize, Sequelize.DataTypes);
db.Booking = require('./booking')(sequelize, Sequelize.DataTypes);
db.Category = require('./Category')(sequelize, Sequelize.DataTypes);
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

// User ↔ FlightBooking
db.User.hasMany(db.FlightBooking, { foreignKey: 'UserId' });
db.FlightBooking.belongsTo(db.User, { foreignKey: 'UserId' });

db.BoatBooking.belongsTo(db.User, { foreignKey: 'userId' }); // BoatBooking has a User
db.User.hasMany(db.BoatBooking, { foreignKey: 'userId' });   // User has many bookings

db.User.hasMany(db.Booking, { foreignKey: 'UserId' });
db.Booking.belongsTo(db.User, { foreignKey: 'UserId' });
db.Category.hasMany(db.Food, { foreignKey: 'categoryId', as: 'foods' });
db.Food.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });
module.exports = db;

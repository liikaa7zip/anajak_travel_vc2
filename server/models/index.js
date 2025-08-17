const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// === Load Models === //

db.User = require('./user')(sequelize, DataTypes);
db.Booking = require('./booking')(sequelize, DataTypes);
db.FlightBooking = require('./FlightBooking')(sequelize, DataTypes);
db.Location = require('./location')(sequelize, DataTypes);
db.Hotel = require('./hotel')(sequelize, DataTypes);
db.HotelBooking = require('./hotelBooking')(sequelize, DataTypes);
db.Housekeeping = require('./housekeeping')(sequelize, DataTypes);
db.Room = require('./room')(sequelize, DataTypes);
db.RoomCategory = require('./roomCategory')(sequelize, DataTypes);
db.Message = require('./message')(sequelize, DataTypes);
db.Food = require('./food')(sequelize, DataTypes);
db.Order = require('./orders')(sequelize, DataTypes);
db.OrderFoodItem = require('./orderFoodItem')(sequelize, DataTypes);
db.BoatBooking = require('./BoatBooking')(sequelize, DataTypes);
db.Category = require('./Category')(sequelize, DataTypes);
db.Payment = require('./Payment')(sequelize, DataTypes);
db.Car = require('./car')(sequelize, Sequelize.DataTypes);
db.Review = require('./review')(sequelize, DataTypes);
// === Define Relationships === //

// User ↔ Hotel (hotel owner)
db.User.hasMany(db.Hotel, { foreignKey: 'ownerId', as: 'OwnedHotels' });
db.Hotel.belongsTo(db.User, { foreignKey: 'ownerId', as: 'owner' });

// Location ↔ Hotel
db.Location.hasMany(db.Hotel, { foreignKey: 'locationId' });
db.Hotel.belongsTo(db.Location, { foreignKey: 'locationId', as: 'Location' });

// Hotel ↔ Room
db.Hotel.hasMany(db.Room, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
db.Room.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// Hotel ↔ RoomCategory
db.Hotel.hasMany(db.RoomCategory, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
db.RoomCategory.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// RoomCategory ↔ Room
db.RoomCategory.hasMany(db.Room, { foreignKey: 'categoryId', onDelete: 'SET NULL' });
db.Room.belongsTo(db.RoomCategory, {
    foreignKey: 'categoryId',
    as: 'RoomCategory'
});


// Room ↔ Housekeeping
db.Room.hasMany(db.Housekeeping, { foreignKey: 'roomId', onDelete: 'CASCADE' });
db.Housekeeping.belongsTo(db.Room, { foreignKey: 'roomId' });

// Room ↔ HotelBooking
db.Room.hasMany(db.HotelBooking, { foreignKey: 'roomId', onDelete: 'CASCADE' });
db.HotelBooking.belongsTo(db.Room, { foreignKey: 'roomId' });

// Hotel ↔ HotelBooking
db.Hotel.hasMany(db.HotelBooking, { foreignKey: 'hotelId', onDelete: 'CASCADE' });
db.HotelBooking.belongsTo(db.Hotel, { foreignKey: 'hotelId' });

// User ↔ HotelBooking
db.User.hasMany(db.HotelBooking, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.HotelBooking.belongsTo(db.User, { foreignKey: 'userId' });

// User ↔ Booking
db.User.hasMany(db.Booking, { foreignKey: 'UserId' });
db.Booking.belongsTo(db.User, { foreignKey: 'UserId' });

// User ↔ FlightBooking
db.User.hasMany(db.FlightBooking, { foreignKey: 'UserId' });
db.FlightBooking.belongsTo(db.User, { foreignKey: 'UserId' });

// User ↔ BoatBooking
db.User.hasMany(db.BoatBooking, { foreignKey: 'userId' });
db.BoatBooking.belongsTo(db.User, { foreignKey: 'userId' });

db.Car.hasMany(db.Booking, { foreignKey: 'carId' });
db.Booking.belongsTo(db.Car, { foreignKey: 'carId' });
db.User.hasMany(db.Order, { foreignKey: 'userId' });
db.Order.belongsTo(db.User, { foreignKey: 'userId' });

// Category ↔ Food
db.Category.hasMany(db.Food, { foreignKey: 'categoryId', as: 'foods' });
db.Food.belongsTo(db.Category, { foreignKey: 'categoryId', as: 'category' });

// Location ↔ Food
db.Location.hasMany(db.Food, { foreignKey: 'locationId' });
db.Food.belongsTo(db.Location, { foreignKey: 'locationId' });

// Order ↔ Food (Many-to-Many through OrderFoodItem)
db.Order.belongsToMany(db.Food, {
    through: db.OrderFoodItem,
    foreignKey: 'orderId',
    otherKey: 'foodId'
});
db.Food.belongsToMany(db.Order, {
    through: db.OrderFoodItem,
    foreignKey: 'foodId',
    otherKey: 'orderId'
});
// === Review Associations === //
db.User.hasMany(db.Review, { foreignKey: 'userId', as: 'reviews', onDelete: 'CASCADE' });
db.Review.belongsTo(db.User, { foreignKey: 'userId', as: 'user' });


module.exports = db;

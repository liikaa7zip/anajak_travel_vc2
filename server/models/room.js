// Room Model
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false, // deluxe, standard, suite, etc.
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    maxOccupancy: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    status: {
      type: DataTypes.ENUM('available', 'booked', 'maintenance'),
      defaultValue: 'available',
    },
    cleaningStatus: {
      type: DataTypes.ENUM('clean', 'dirty', 'in_progress'),
      defaultValue: 'clean',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT, 
      allowNull: true,
    },
  });
  


  return Room;
};

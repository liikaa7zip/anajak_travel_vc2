// Room Category Model
module.exports = (sequelize, DataTypes) => {
  const RoomCategory = sequelize.define('RoomCategory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    basePrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });
  
  return RoomCategory;
};

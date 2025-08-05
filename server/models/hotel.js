module.exports = (sequelize, DataTypes) => {
  const Hotel = sequelize.define('Hotel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pricePerNight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    amenities: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    locationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Hotel.associate = (models) => {

    Hotel.belongsTo(models.Location, {
      foreignKey: 'locationId',
      as: 'location',
      onDelete: 'CASCADE'
    });

  };

  return Hotel;
};

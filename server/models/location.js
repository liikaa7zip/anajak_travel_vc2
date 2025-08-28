module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Location.associate = (models) => {
    Location.hasMany(models.Hotel, { foreignKey: 'locationId' });
    Location.hasMany(models.Food, { foreignKey: 'locationId' }); // ✅ Add this line
  };

  return Location;
};

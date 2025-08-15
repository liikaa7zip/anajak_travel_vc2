module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    plateNumber: DataTypes.STRING 
  }, {});

  Car.associate = (models) => {
    Car.hasMany(models.Booking, {
      foreignKey: 'carId'
    });
  };

  return Car;
};

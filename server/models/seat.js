module.exports = (sequelize, DataTypes) => {
  const Seat = sequelize.define('Seat', {
    number: DataTypes.STRING,
    booked: DataTypes.BOOLEAN,
    carId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cars',
        key: 'id'
      }
    }
  });

  Seat.associate = models => {
    Seat.belongsTo(models.Car, { foreignKey: 'carId' });
  };

  return Seat;
};

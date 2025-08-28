// models/FlightBooking.js
module.exports = (sequelize, DataTypes) => {
  const FlightBooking = sequelize.define(
    'FlightBooking',
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      airline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      classType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      passengers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      passengerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'confirmed',
      },
    },
    {
      tableName: 'FlightBookings',
      timestamps: true,
    }
  );

  return FlightBooking;
};

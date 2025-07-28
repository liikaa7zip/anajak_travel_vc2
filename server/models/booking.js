// models/booking.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    depart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrive: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['bus', 'private_car', 'van', 'luxury']],
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'confirmed',
      validate: {
        isIn: [['confirmed', 'cancelled', 'pending', 'completed']],
      },
    },
  }, {
    tableName: 'bookings',
    timestamps: true,
  });

  return Booking;
};

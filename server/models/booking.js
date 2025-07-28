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
  }, {
    timestamps: true,
    tableName: 'bookings',
  });

  return Booking;
};

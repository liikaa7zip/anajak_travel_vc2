// models/booking.js
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    },
    depart: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arrive: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // type: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     isIn: [['bus', 'private_car', 'van', 'luxury']],
    //   },
    // },
      timeOfDay: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['day', 'night']],
      },
    },
      seatNumbers: {
      type: DataTypes.STRING, // use JSON to store arrays in Sequelize
      allowNull: false,
    },
      price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0
      }
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
    carId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'cars',
        key: 'id',
      },
    },

    time: {
      type: DataTypes.STRING,  // store hour as integer (e.g., 7, 18, 21)
      allowNull: false,
    },
    
  }, {
    tableName: 'bookings',
    timestamps: true,
  });

  return Booking;
};

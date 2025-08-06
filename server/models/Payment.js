// models/payment.js
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cardName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true
  });

  return Payment;
};

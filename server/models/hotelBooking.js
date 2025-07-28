  module.exports = (sequelize, DataTypes) => {
    return sequelize.define('HotelBooking', {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      hotelId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      guests: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    });
  };

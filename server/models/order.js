'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: {
      type: DataTypes.INTEGER, // match users.id type
      allowNull: true,         // required for ON DELETE SET NULL
    },
    foodId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hotelId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
    restaurantOwnerId: {
  type: DataTypes.INTEGER,
  allowNull: false
}
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    Order.belongsTo(models.Food, {
      foreignKey: 'foodId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
    Order.belongsTo(models.Hotel, {
      foreignKey: 'hotelId',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  };

  return Order;
};

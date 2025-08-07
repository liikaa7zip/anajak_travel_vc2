module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'confirmed',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsToMany(models.Food, {
      through: models.OrderFoodItem,
      foreignKey: 'orderId',
      otherKey: 'foodId',
    });

    Order.hasMany(models.OrderFoodItem, {
      foreignKey: 'orderId',
      as: 'orderItems',
    });

    Order.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Order;
};

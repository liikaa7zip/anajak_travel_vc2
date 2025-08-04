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
      defaultValue: 'confirmed'
    }
  });

  Order.associate = (models) => {
    Order.belongsToMany(models.Food, {
      through: models.OrderFoodItem,
      foreignKey: 'orderId',
      otherKey: 'foodId',
    });
  };

  return Order;
};

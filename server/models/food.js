// models/Food.js
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING },
    locationId: { type: DataTypes.INTEGER },
    categoryId: { type: DataTypes.INTEGER } 
  });

  Food.associate = (models) => {
    Food.belongsToMany(models.Order, {
      through: models.OrderFoodItem,
      foreignKey: 'foodId',
      otherKey: 'orderId',
    });

    Food.belongsTo(models.Location, { foreignKey: 'locationId' }); // <- Association
  };

  return Food;
};

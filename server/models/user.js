module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'user', 'restaurant_owner', 'hotel_owner'), defaultValue: 'user' },
  }, {
    tableName: 'users',
    timestamps: true,
  });
  return User;
};

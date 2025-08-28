'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'restaurant_owner', 'hotel_owner', 'transport_owner'),
      allowNull: false,
      defaultValue: 'user',
    },
    hasRestaurant: {
      type: DataTypes.ENUM('has_restaurant', 'no_restaurant'),
      allowNull: true, // only relevant for hotel_owner
    },
    profileImage: { 
      type: DataTypes.STRING, 
      allowNull: true, 
      defaultValue: "default.png" 
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });
    User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: "userId",
      as: "reviews",
    });
  };
  return User;
};

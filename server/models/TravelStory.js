module.exports = (sequelize, DataTypes) => {
  const TravelStory = sequelize.define('TravelStory', {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    coverImage: DataTypes.STRING,
    is_public: DataTypes.BOOLEAN
  });

  return TravelStory;
};

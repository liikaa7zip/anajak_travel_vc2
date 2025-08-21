module.exports = (sequelize, DataTypes) => {
  return sequelize.define('GalleryPhoto', {
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'gallery_photos',
    timestamps: false,
  });
};

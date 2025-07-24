module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    sender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Message;
};

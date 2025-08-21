// Housekeeping Model
module.exports = (sequelize, DataTypes) => {
  const Housekeeping = sequelize.define('Housekeeping', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    housekeeperName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scheduledTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('assigned', 'in_progress', 'completed', 'cancelled'),
      defaultValue: 'assigned',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    completedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
  return Housekeeping;
};

// models/Transport.js
module.exports = (sequelize, DataTypes) => {
  const Transport = sequelize.define('Transport', {
    depart: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrive: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  })

  return Transport
}

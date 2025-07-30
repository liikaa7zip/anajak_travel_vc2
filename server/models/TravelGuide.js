const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TravelGuide = sequelize.define('TravelGuide', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  tags: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('tags');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('tags', JSON.stringify(val || []));
    },
  },
}, {
  tableName: 'travel_guides',
  timestamps: false,
});

module.exports = TravelGuide;

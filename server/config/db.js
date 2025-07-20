// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//   }
// );

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('anajak_travel_vc2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false // or console.log if you want query logs
});

module.exports = sequelize;
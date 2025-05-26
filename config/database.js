const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: process.env.DB_DIALECT || 'postgres',
  dialectOptions: process.env.DB_SSL === 'true' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: false
});

module.exports = sequelize;

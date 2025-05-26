const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Camera = sequelize.define('Camera', {
  nome: DataTypes.STRING,
  ip: DataTypes.STRING,
  protocolo: DataTypes.STRING,
  porta: DataTypes.STRING,
  caminho: DataTypes.STRING,
  local: DataTypes.STRING,
  ativa: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

module.exports = Camera;

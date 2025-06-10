const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  camera_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  local: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo_incidente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  confianca: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'não resolvido'
  },
  imagem_base64: {
    type: DataTypes.TEXT('long'), // ou DataTypes.TEXT apenas, se estiver usando SQLite
    allowNull: true
  }
});

module.exports = Log;

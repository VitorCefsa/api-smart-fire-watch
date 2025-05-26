const { Op, fn, col } = require('sequelize');
const Log = require('../models/Log');

module.exports = {
  // Total de incidentes por dia
  async totalPorDia(req, res) {
    try {
      const dados = await Log.findAll({
        attributes: ['data', [fn('COUNT', col('id')), 'total']],
        group: ['data'],
        order: [['data', 'ASC']]
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar dados por dia' });
    }
  },

  // Total por tipo de incidente
  async totalPorTipo(req, res) {
    try {
      const dados = await Log.findAll({
        attributes: ['tipo_incidente', [fn('COUNT', col('id')), 'total']],
        group: ['tipo_incidente'],
        order: [['total', 'DESC']]
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar dados por tipo' });
    }
  },

  // Total por local
  async totalPorLocal(req, res) {
    try {
      const dados = await Log.findAll({
        attributes: ['local', [fn('COUNT', col('id')), 'total']],
        group: ['local'],
        order: [['total', 'DESC']]
      });
      return res.json(dados);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao gerar dados por local' });
    }
  }
};

const Log = require('../models/Log');
const { emitirNovoIncidente } = require('../socketServer');
const { Op } = require('sequelize');

module.exports = {
  async createLog(req, res) {
    try {
      const {
        data,
        hora,
        camera_id,
        local,
        tipo_incidente,
        confianca,
        imagem_base64 // novo campo
      } = req.body;

      const log = await Log.create({
        data,
        hora,
        camera_id,
        local,
        tipo_incidente,
        confianca,
        imagem_base64, // salvar a imagem
        status: 'não resolvido'
      });

      emitirNovoIncidente(log);
      return res.status(201).json(log);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar log de incêndio' });
    }
  },

  async getAllLogs(req, res) {
    try {
      const logs = await Log.findAll({
        order: [['data', 'DESC'], ['hora', 'DESC']]
      });

      console.log("Logs retornados:", logs.map(log => log.toJSON()));
      return res.json(logs);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
      return res.status(500).json({ error: 'Erro ao buscar logs' });
    }
  },

  async getLogById(req, res) {
    try {
      const { id } = req.params;
      const log = await Log.findByPk(id);
      if (!log) return res.status(404).json({ error: 'Log não encontrado' });
      return res.json(log);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar log' });
    }
  },

  async getLogsByDateRange(req, res) {
    try {
      const { inicio, fim } = req.query;
      const logs = await Log.findAll({
        where: {
          data: {
            [Op.between]: [inicio, fim]
          }
        },
        order: [['data', 'DESC'], ['hora', 'DESC']]
      });
      return res.json(logs);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar logs por período' });
    }
  },

  async resolverLog(req, res) {
    try {
      const { id } = req.params;
      const log = await Log.findByPk(id);
      if (!log) return res.status(404).json({ error: 'Log não encontrado' });

      log.status = 'resolvido';
      await log.save();

      return res.json({ message: 'Incidente marcado como resolvido', log });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar log' });
    }
  }
};

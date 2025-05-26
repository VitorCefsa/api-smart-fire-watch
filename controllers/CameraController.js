const Camera = require('../models/Camera');

module.exports = {
  async getAll(req, res) {
    try {
      const cameras = await Camera.findAll();
      res.json(cameras);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async create(req, res) {
    try {
      const camera = await Camera.create(req.body);
      res.status(201).json(camera);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Camera.update(req.body, { where: { id } });
      if (updated) {
        const updatedCamera = await Camera.findByPk(id);
        res.json(updatedCamera);
      } else {
        res.status(404).json({ message: 'Camera não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Camera.destroy({ where: { id } });
      if (deleted) {
        res.json({ message: 'Excluída com sucesso' });
      } else {
        res.status(404).json({ message: 'Camera não encontrada' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

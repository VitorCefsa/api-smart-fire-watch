const express = require('express');
const router = express.Router();

const LogController = require('../controllers/LogController');

// Rotas de logs
router.post('/logs', LogController.createLog);
router.get('/logs', LogController.getAllLogs);
router.get('/logs/:id', LogController.getLogById);
router.get('/logs-por-data', LogController.getLogsByDateRange);

// ✅ Adicione esta linha abaixo das rotas de log:
router.use('/dashboard', require('./dashboard'));
router.use('/cameras', require('./cameras'));
router.use('/cameras-db', require('./cameraDbRoutes'));


module.exports = router;

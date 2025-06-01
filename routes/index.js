const express = require('express');
const router = express.Router();

const LogController = require('../controllers/LogController');
const inferenceRoutes = require('./inferenceRoutes');

router.post('/logs', LogController.createLog);
router.get('/logs', LogController.getAllLogs);
router.get('/logs/:id', LogController.getLogById);
router.get('/logs-por-data', LogController.getLogsByDateRange);

router.use('/dashboard', require('./dashboard'));
router.use('/cameras', require('./cameras'));
router.use('/cameras-db', require('./cameraDbRoutes'));
router.use('/infer', inferenceRoutes);
router.use('/capturas', require('./capturaRoutes'));


module.exports = router;

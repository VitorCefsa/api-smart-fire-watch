const express = require('express');
const router = express.Router();
const CameraController = require('../controllers/CameraController');

router.get('/', CameraController.getAll);
router.post('/', CameraController.create);
router.put('/:id', CameraController.update);
router.delete('/:id', CameraController.delete);

module.exports = router;

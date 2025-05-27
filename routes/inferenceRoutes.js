const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const { imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Imagem base64 ausente' });
  }

  try {
    const response = await axios.post(
      'https://serverless.roboflow.com/smartfirewatch_modelo_5/1?api_key=H8ZX6BgARrnWxbwjHfhu',
      imageBase64,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('❌ Erro na inferência:', error.message);
    res.status(500).json({ error: 'Erro ao inferir imagem' });
  }
});

module.exports = router;

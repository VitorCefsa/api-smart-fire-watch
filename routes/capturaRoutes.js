const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// ✅ Importa a função para adicionar à fila de inferência
const { adicionarNaFila } = require('../services/inferenceQueue');

router.post('/:filename', (req, res) => {
  const { filename } = req.params;
  const { imageBase64 } = req.body;

  if (!filename || !imageBase64) {
    console.error('❌ Dados inválidos recebidos');
    return res.status(400).json({ error: 'filename ou imageBase64 ausente' });
  }

  const filePath = path.join(__dirname, '..', 'capturas', filename);
  const buffer = Buffer.from(imageBase64, 'base64');

  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error('❌ Erro ao salvar imagem:', err);
      return res.status(500).json({ error: 'Erro ao salvar imagem' });
    }

    console.log(`✅ Imagem salva com sucesso: ${filename}`);
    console.log(`🌐 Acesse em: http://localhost:3333/capturas/${filename}`);

    // ✅ Adiciona à fila de inferência
    adicionarNaFila(filename);

    return res.status(200).json({ message: 'Imagem salva com sucesso' });
  });
});

module.exports = router;

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Criar pasta se não existir
const capturasPath = path.join(__dirname, 'capturas');
if (!fs.existsSync(capturasPath)) {
  fs.mkdirSync(capturasPath);
}

// Servir imagens estaticamente
app.use('/capturas', express.static(capturasPath));

// 🔗 Rotas
app.use(require('./routes'));
app.use('/capturas', require('./routes/capturaRoutes'));

// 🧠 Iniciar processamento da fila
const { iniciarFila } = require('./services/inferenceQueue');
iniciarFila(); // ← esta linha inicia o loop automático

module.exports = app;

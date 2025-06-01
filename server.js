const app = require('./app');
const sequelize = require('./config/database');
const { iniciarFila } = require('./services/inferenceQueue'); // ⬅️ IMPORTANTE

sequelize.sync({ force: false }) // force true apaga tudo a cada start
  .then(() => {
    console.log('Banco sincronizado');
    
    // ⬇️ INICIAR PROCESSAMENTO DE FILA
    iniciarFila(); // <- garante execução contínua
  })
  .catch(err => console.error('Erro ao sincronizar banco', err));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

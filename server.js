const app = require('./app');
const sequelize = require('./config/database');
sequelize.sync({ force: false }) // force true apaga tudo a cada start
  .then(() => console.log('Banco sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco', err));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

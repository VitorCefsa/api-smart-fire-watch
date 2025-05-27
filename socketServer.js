const { Server } = require('socket.io');
const http = require('http');

const PORT = 4000;

const server = http.createServer();
const io = new Server(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('📱 App mobile conectado ao Socket');

  socket.on('disconnect', () => {
    console.log('❌ App desconectado');
  });
});

// Função para emitir de fora
function emitirNovoIncidente(incidente) {
  io.emit('novo_incidente', incidente);
}

server.listen(PORT, () => {
  console.log(`🚀 Socket Server (mobile) ouvindo na porta ${PORT}`);
});

module.exports = { emitirNovoIncidente };

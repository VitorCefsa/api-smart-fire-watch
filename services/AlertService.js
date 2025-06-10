module.exports = {
  verificarAlerta(log) {
    if (log.confianca && log.confianca > 0.9) {
      console.log(`[ALERTA] Incêndio detectado com alta confiança em ${log.local}`);
      // aqui você pode disparar notificação, webhook, som, etc
    }
  }
};

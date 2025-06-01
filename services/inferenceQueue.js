const fs = require("fs");
const path = require("path");
const axios = require("axios");

const pastaCapturas = path.join(__dirname, "..", "capturas");
let fila = [];
let processando = false;

function adicionarNaFila(nomeArquivo) {
    if (!fila.includes(nomeArquivo)) {
        fila.push(nomeArquivo);
    }
}

async function processarFila() {
    if (processando || fila.length === 0) return;

    processando = true;
    const filename = fila.shift();
    const filePath = path.join(pastaCapturas, filename);

    try {
        const image = fs.readFileSync(filePath, { encoding: "base64" });

        const response = await axios({
            method: "POST",
            url: "https://serverless.roboflow.com/smartfirewatch_modelo_5/1",
            params: {
                api_key: "H8ZX6BgARrnWxbwjHfhu"
            },
            data: new URLSearchParams({ image: image }).toString(),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });


        const predictions = response.data.predictions || [];

        if (predictions.length === 0) {
            console.log(`🟩 Sem fogo na imagem: ${filename}`);
            fs.unlinkSync(filePath); // Deleta imagem sem fogo
        } else {
            console.log(`🔥 Fogo detectado na imagem: ${filename}`);
            // aqui você pode emitir um sinal ou logar no banco
        }
    } catch (err) {
        console.error(`❌ Erro ao processar imagem: ${filename}`, err.message);
    } finally {
        processando = false;
        setTimeout(processarFila, 100); // processar próximo após 100ms
    }
}

function iniciarFila() {
    setInterval(processarFila, 1000);
}

module.exports = {
    adicionarNaFila,
    iniciarFila
};

const express = require('express');
const bodyParser = require('body-parser');
const { enviarEmail, gerarChaveAleatoria, gerarQRCode } = require('./finalizarCompra'); // Importa também a função gerarQRCode

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rota para finalizar a compra
app.post('/finalizar-compra', (req, res) => {
    // Recupera os dados do filme e e-mail do corpo da requisição
    const filme = req.body.filme;
    const email = req.body.email;

    // Verifica se o filme e o e-mail estão presentes e têm os dados esperados
    if (!filme || !email || !filme.nome || !filme.data || !filme.hora || !filme.local) {
        return res.status(400).send('Dados de filme ou e-mail inválidos.');
    }

    // Gera uma chave aleatória para o pagamento
    const chavePagamento = gerarChaveAleatoria();

    // Gera o QR Code com os dados do filme e a chave de pagamento
    const textoQRCode = `Filme: ${filme.nome}\nData: ${filme.data}\nHora: ${filme.hora}\nLocal: ${filme.local}\nChave de Pagamento: ${chavePagamento}`;
    const qrCode = gerarQRCode(textoQRCode);

    // Atualiza os dados do filme com o QR Code e a chave de pagamento
    filme.qrCode = qrCode;
    filme.chavePagamento = chavePagamento;

    // Envia o e-mail com os detalhes da compra, incluindo o filme atualizado
    enviarEmail(email, 'Detalhes sobre a compra', textoQRCode); // Corrigido para enviar o texto do QR Code

    // Envie uma resposta para indicar que a compra foi concluída com sucesso
    res.status(200).send('Compra finalizada com sucesso!');
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// finalizarCompra.js

// Exemplo de uso do Nodemailer para enviar e-mail
const { sendEmails } = require('./emailService');
const { createCanvas } = require('canvas');
const QRCode = require('qrcode');

// Função para gerar o QR Code
async function gerarQRCode(texto) {
    try {
        const canvas = createCanvas(200, 200);
        await QRCode.toCanvas(canvas, texto);
        return canvas.toDataURL(); // Retorna o QR Code como uma URL de dados
    } catch (err) {
        console.error(err);
        return null;
    }
}

// Função para enviar e-mail com os dados do filme e o QR Code
async function enviarEmail(email, mensagem, filme) {
    try {
        const qrCode = await gerarQRCode(JSON.stringify(filme));
        const mailOptions = {
            subject: 'Compra de ingresso realizada com sucesso!',
            html: `<p>${mensagem}</p>
                   <p>Filme: ${filme.nome}</p>
                   <p>Data: ${filme.data}</p>
                   <p>Hora: ${filme.hora}</p>
                   <p>Local: ${filme.local}</p>
                   <img src="${qrCode}" alt="QR Code para pagamento">`
        };
        await sendEmails(email, mailOptions.subject, mailOptions.html);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

// Função para gerar uma chave aleatória
function gerarChaveAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const tamanho = 10;
    let chave = '';
    for (let i = 0; i < tamanho; i++) {
        chave += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return chave;
}

// Função para finalizar a compra e diminuir o número de vagas disponíveis
async function finalizarCompra(email, filme) {
    try {
        // Implemente a lógica para finalizar a compra aqui
        // Reduz o número de vagas disponíveis do filme
        filme.vagas--;

        // Envie o e-mail com os detalhes do filme e o QR Code
        const mensagem = 'Compra realizada com sucesso! Confira os detalhes do seu ingresso:';
        await enviarEmail(email, mensagem, filme);

        console.log('Compra finalizada com sucesso!');
    } catch (error) {
        console.error('Erro ao finalizar a compra:', error);
    }
}

module.exports = { finalizarCompra, gerarQRCode, gerarChaveAleatoria };

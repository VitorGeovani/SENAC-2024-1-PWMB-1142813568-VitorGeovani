// emailService.js

const nodemailer = require('nodemailer');
require('dotenv').config();

// Configurações de transporte do Nodemailer
const mailConfig = {
    service: 'gmail', // Alterado para 'gmail'
    auth: {
        user: process.env.EMAIL || 'cinemadofestival@gmail.com',
        pass: process.env.PASSWORD || 'skge guqq sxkg wfvy'
    }
};

// Criação do transporte
const transport = nodemailer.createTransport(mailConfig);

// Função para enviar e-mails
exports.sendEmails = async (email, title, output, attachments) => {
    let message = {
        from: process.env.EMAIL || 'cinemadofestival@gmail.com',
        to: email,
        replyTo: process.env.EMAIL || 'cinemadofestival@gmail.com',
        subject: title,
        html: output,
        attachments: attachments,
        date: Date.now()
    };

    try {
        // Envio do e-mail
        const info = await transport.sendMail(message);
        console.log('E-mail enviado:', info);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
};
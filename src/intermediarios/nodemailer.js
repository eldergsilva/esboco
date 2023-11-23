const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const enviarEmail = async (to, subject, body) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to,
            subject,
            text: body,
        });

        console.log(`E-mail enviado para ${to} com sucesso.`);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error; // Rejeita a promise em caso de erro para que o chamador saiba que ocorreu um problema no envio do e-mail.
    }
};

module.exports = enviarEmail;
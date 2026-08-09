const nodemailer = require('nodemailer');

function createTransporter() {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Modo dev: sem SMTP configurado, só loga o conteúdo no terminal
  return {
    sendMail: async (options) => {
      console.log('\n📧 [DEV] E-mail simulado (configure SMTP_* no .env para envio real)');
      console.log(`Para: ${options.to}`);
      console.log(`Assunto: ${options.subject}`);
      console.log(`Link: ${options.text}\n`);
      return { messageId: 'dev-mode' };
    },
  };
}

module.exports = createTransporter();
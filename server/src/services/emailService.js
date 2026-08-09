const transporter = require('../config/mailer');

async function sendPasswordResetEmail(to, resetUrl) {
  await transporter.sendMail({
    from: process.env.MAIL_FROM || 'AgendaGlass <no-reply@agendaglass.app>',
    to,
    subject: 'Recuperação de senha, AgendaGlass',
    text: resetUrl,
    html: `
      <div style="font-family: sans-serif; background:#0B1A14; color:#EAFBF1; padding:24px; border-radius:12px;">
        <h2 style="color:#39FF88; margin-bottom:16px;">AgendaGlass</h2>
        <p>Recebemos um pedido para redefinir sua senha.</p>
        <p style="margin:20px 0;">
          <a href="${resetUrl}" style="color:#0B1A14; background:#39FF88; padding:10px 20px; border-radius:999px; text-decoration:none; font-weight:bold;">
            Criar nova senha
          </a>
        </p>
        <p style="font-size:12px; color:#6B8A7A;">
          Esse link expira em 1 hora. Se você não pediu isso, apenas ignore este e-mail.
        </p>
      </div>
    `,
  });
}

module.exports = { sendPasswordResetEmail };
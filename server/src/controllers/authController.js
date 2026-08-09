const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const { generateToken } = require('../utils/jwt');
const passwordResetModel = require('../models/passwordResetModel');
const { sendPasswordResetEmail } = require('../services/emailService');

const SALT_ROUNDS = 10;

async function register(req, res) {
  try {
    const { name, email, password, username } = req.body;

    const existingEmail = await userModel.findUserByEmail(email);
    if (existingEmail) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    const existingUsername = await userModel.findUserByUsername(username);
    if (existingUsername) {
      return res.status(409).json({ error: 'Nome de usuário já em uso' });
    }

    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await userModel.createUser({ name, email, passwordHash, username });

    const token = generateToken({ sub: user.id });

    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = generateToken({ sub: user.id });

    const { password_hash, ...safeUser } = user;

    return res.json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao fazer login' });
  }
}

async function me(req, res) {
  const user = await userModel.findUserById(req.userId);
  if (!user) {
    return res.status(404).json({ error: 'Usuário não encontrado' });
  }
  return res.json({ user });
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await userModel.findUserByEmail(email);

    // Mensagem genérica sempre, mesmo se o e-mail não existir (evita enumeração de contas)
    const genericResponse = {
      message: 'Se esse e-mail estiver cadastrado, você receberá instruções de recuperação em instantes.',
    };

    if (!user) {
      return res.json(genericResponse);
    }

    const rawToken = await passwordResetModel.createResetToken(user.id);
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawToken}`;

    await sendPasswordResetEmail(user.email, resetUrl);

    return res.json(genericResponse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
}

async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    const resetRecord = await passwordResetModel.findValidToken(token);
    if (!resetRecord) {
      return res.status(400).json({ error: 'Link inválido ou expirado. Solicite a recuperação novamente.' });
    }

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await userModel.updatePassword(resetRecord.user_id, passwordHash);
    await passwordResetModel.markTokenUsed(resetRecord.id);

    return res.json({ message: 'Senha atualizada com sucesso. Você já pode entrar com a nova senha.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao redefinir senha' });
  }
}

module.exports = { register, login, me, forgotPassword, resetPassword };
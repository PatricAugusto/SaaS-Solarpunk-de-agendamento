const pool = require('../config/db');
const { generateRawToken, hashToken } = require('../utils/token');

const TOKEN_TTL_MINUTES = 60;

async function createResetToken(userId) {
  const rawToken = generateRawToken();
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MINUTES * 60 * 1000);

  await pool.query(
    `INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1, $2, $3)`,
    [userId, tokenHash, expiresAt]
  );

  return rawToken; // só o token cru (não hasheado) sai daqui, pra ir no e-mail
}

async function findValidToken(rawToken) {
  const tokenHash = hashToken(rawToken);
  const query = `
    SELECT * FROM password_resets
    WHERE token_hash = $1 AND used = false AND expires_at > now()
  `;
  const { rows } = await pool.query(query, [tokenHash]);
  return rows[0];
}

async function markTokenUsed(id) {
  await pool.query(`UPDATE password_resets SET used = true WHERE id = $1`, [id]);
}

module.exports = { createResetToken, findValidToken, markTokenUsed };
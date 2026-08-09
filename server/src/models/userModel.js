const pool = require('../config/db');

async function createUser({ name, email, passwordHash, username }) {
  const query = `
    INSERT INTO users (name, email, password_hash, username)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, username, timezone, created_at
  `;
  const { rows } = await pool.query(query, [name, email, passwordHash, username]);
  return rows[0];
}

async function findUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

async function findUserByUsername(username) {
  const query = `SELECT * FROM users WHERE username = $1`;
  const { rows } = await pool.query(query, [username]);
  return rows[0];
}

async function findUserById(id) {
  const query = `
    SELECT id, name, email, username, timezone, created_at
    FROM users WHERE id = $1
  `;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function updatePassword(userId, passwordHash) {
  await pool.query(`UPDATE users SET password_hash = $1, updated_at = now() WHERE id = $2`, [
    passwordHash,
    userId,
  ]);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  updatePassword, 
};
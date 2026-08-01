const pool = require('../config/db');

async function createEventType({ userId, title, slug, description, durationMinutes, color }) {
  const query = `
    INSERT INTO event_types (user_id, title, slug, description, duration_minutes, color)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [
    userId, title, slug, description || null, durationMinutes, color || '#39FF88',
  ]);
  return rows[0];
}

async function listEventTypesByUser(userId) {
  const query = `
    SELECT * FROM event_types
    WHERE user_id = $1
    ORDER BY created_at DESC
  `;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

async function findEventTypeBySlug(username, slug) {
  const query = `
    SELECT et.*, u.name AS host_name, u.username, u.timezone AS host_timezone
    FROM event_types et
    JOIN users u ON u.id = et.user_id
    WHERE u.username = $1 AND et.slug = $2 AND et.is_active = true
  `;
  const { rows } = await pool.query(query, [username, slug]);
  return rows[0];
}

async function findEventTypeById(id) {
  const query = `SELECT * FROM event_types WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

async function deleteEventType(id, userId) {
  const query = `DELETE FROM event_types WHERE id = $1 AND user_id = $2 RETURNING id`;
  const { rows } = await pool.query(query, [id, userId]);
  return rows[0];
}

module.exports = {
  createEventType,
  listEventTypesByUser,
  findEventTypeBySlug,
  findEventTypeById,
  deleteEventType,
};
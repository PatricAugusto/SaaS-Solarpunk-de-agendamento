const pool = require('../config/db');

async function createBooking({ eventTypeId, hostUserId, guestName, guestEmail, startTime, endTime }) {
  const query = `
    INSERT INTO bookings (event_type_id, host_user_id, guest_name, guest_email, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const { rows } = await pool.query(query, [
    eventTypeId, hostUserId, guestName, guestEmail, startTime, endTime,
  ]);
  return rows[0];
}

async function listBookingsByHost(hostUserId) {
  const query = `
    SELECT b.*, et.title AS event_title, et.duration_minutes
    FROM bookings b
    JOIN event_types et ON et.id = b.event_type_id
    WHERE b.host_user_id = $1
    ORDER BY b.start_time ASC
  `;
  const { rows } = await pool.query(query, [hostUserId]);
  return rows;
}

async function cancelBooking(id, hostUserId) {
  const query = `
    UPDATE bookings SET status = 'cancelled'
    WHERE id = $1 AND host_user_id = $2
    RETURNING *
  `;
  const { rows } = await pool.query(query, [id, hostUserId]);
  return rows[0];
}

module.exports = { createBooking, listBookingsByHost, cancelBooking };
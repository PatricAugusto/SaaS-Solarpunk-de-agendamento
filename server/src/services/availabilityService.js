const {
  addMinutes,
  isBefore,
  isEqual,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
  format,
  isWithinInterval,
} = require('date-fns');
const pool = require('../config/db');

const WORK_START_HOUR = 9;
const WORK_END_HOUR = 18;

/**
 * Gera todos os slots possíveis de um dia, dado a duração do evento,
 * respeitando o horário comercial fixo (09h-18h).
 */
function generateDaySlots(date, durationMinutes) {
  const dayOfWeek = date.getDay(); // 0 = domingo, 6 = sábado
  if (dayOfWeek === 0 || dayOfWeek === 6) return []; // sem slots no fim de semana

  let cursor = setMilliseconds(setSeconds(setMinutes(setHours(date, WORK_START_HOUR), 0), 0), 0);
  const dayEnd = setMilliseconds(setSeconds(setMinutes(setHours(date, WORK_END_HOUR), 0), 0), 0);

  const slots = [];
  while (isBefore(addMinutes(cursor, durationMinutes), dayEnd) || isEqual(addMinutes(cursor, durationMinutes), dayEnd)) {
    slots.push({
      start: cursor,
      end: addMinutes(cursor, durationMinutes),
    });
    cursor = addMinutes(cursor, durationMinutes);
  }

  return slots;
}

/**
 * Busca bookings confirmados de um host num intervalo de tempo (para filtrar o dia).
 */
async function getBookingsForDay(hostUserId, dayStart, dayEnd) {
  const query = `
    SELECT start_time, end_time
    FROM bookings
    WHERE host_user_id = $1
      AND status = 'confirmed'
      AND start_time < $3
      AND end_time > $2
  `;
  const { rows } = await pool.query(query, [hostUserId, dayStart, dayEnd]);
  return rows;
}

/**
 * Retorna os slots disponíveis (livres de conflito) para um host, num dia, para um evento.
 */
async function getAvailableSlots({ hostUserId, date, durationMinutes }) {
  const candidateSlots = generateDaySlots(date, durationMinutes);
  if (candidateSlots.length === 0) return [];

  const dayStart = setMilliseconds(setSeconds(setMinutes(setHours(date, 0), 0), 0), 0);
  const dayEnd = setMilliseconds(setSeconds(setMinutes(setHours(date, 23), 59), 59), 0);

  const existingBookings = await getBookingsForDay(hostUserId, dayStart, dayEnd);

  const freeSlots = candidateSlots.filter((slot) => {
    const hasConflict = existingBookings.some((booking) =>
      slotsOverlap(slot.start, slot.end, new Date(booking.start_time), new Date(booking.end_time))
    );
    return !hasConflict;
  });

  return freeSlots.map((slot) => ({
    start: slot.start.toISOString(),
    end: slot.end.toISOString(),
    label: format(slot.start, 'HH:mm'),
  }));
}

/**
 * Regra de sobreposição de intervalos: dois intervalos [aStart,aEnd) e [bStart,bEnd)
 * conflitam se aStart < bEnd E aEnd > bStart.
 */
function slotsOverlap(aStart, aEnd, bStart, bEnd) {
  return isBefore(aStart, bEnd) && isBefore(bStart, aEnd);
}

/**
 * Checagem definitiva de conflito no momento de CRIAR o booking (fonte da verdade,
 * roda direto contra o banco pra evitar race condition entre a listagem de slots e a criação).
 */
async function hasConflict({ hostUserId, startTime, endTime, excludeBookingId = null }) {
  const query = `
    SELECT id FROM bookings
    WHERE host_user_id = $1
      AND status = 'confirmed'
      AND start_time < $3
      AND end_time > $2
      ${excludeBookingId ? 'AND id != $4' : ''}
  `;
  const params = excludeBookingId
    ? [hostUserId, startTime, endTime, excludeBookingId]
    : [hostUserId, startTime, endTime];

  const { rows } = await pool.query(query, params);
  return rows.length > 0;
}

module.exports = { getAvailableSlots, hasConflict, slotsOverlap };
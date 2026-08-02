const { parseISO, addMinutes } = require('date-fns');
const bookingModel = require('../models/bookingModel');
const eventTypeModel = require('../models/eventTypeModel');
const availabilityService = require('../services/availabilityService');

async function getAvailability(req, res) {
  try {
    const { username, slug } = req.params;
    const { date } = req.query; // formato esperado: YYYY-MM-DD

    if (!date) {
      return res.status(400).json({ error: 'Parâmetro "date" é obrigatório (YYYY-MM-DD)' });
    }

    const eventType = await eventTypeModel.findEventTypeBySlug(username, slug);
    if (!eventType) {
      return res.status(404).json({ error: 'Tipo de evento não encontrado' });
    }

    const slots = await availabilityService.getAvailableSlots({
      hostUserId: eventType.user_id,
      date: parseISO(date),
      durationMinutes: eventType.duration_minutes,
    });

    return res.json({ slots });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
  }
}

async function create(req, res) {
  try {
    const { username, slug } = req.params;
    const { guestName, guestEmail, startTime } = req.body;

    const eventType = await eventTypeModel.findEventTypeBySlug(username, slug);
    if (!eventType) {
      return res.status(404).json({ error: 'Tipo de evento não encontrado' });
    }

    const start = parseISO(startTime);
    const end = addMinutes(start, eventType.duration_minutes);

    const conflict = await availabilityService.hasConflict({
      hostUserId: eventType.user_id,
      startTime: start,
      endTime: end,
    });

    if (conflict) {
      return res.status(409).json({
        error: 'Esse horário acabou de ser ocupado. Escolha outro horário disponível.',
      });
    }

    const booking = await bookingModel.createBooking({
      eventTypeId: eventType.id,
      hostUserId: eventType.user_id,
      guestName,
      guestEmail,
      startTime: start,
      endTime: end,
    });

    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
}

async function listMine(req, res) {
  const bookings = await bookingModel.listBookingsByHost(req.userId);
  return res.json({ bookings });
}

async function cancel(req, res) {
  const cancelled = await bookingModel.cancelBooking(req.params.id, req.userId);
  if (!cancelled) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  return res.json({ booking: cancelled });
}

async function getAvailabilityForHost(req, res) {
  try {
    const { eventTypeId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Parâmetro "date" é obrigatório (YYYY-MM-DD)' });
    }

    const eventType = await eventTypeModel.findEventTypeById(eventTypeId);
    if (!eventType || eventType.user_id !== req.userId) {
      return res.status(404).json({ error: 'Tipo de evento não encontrado' });
    }

    const slots = await availabilityService.getAvailableSlots({
      hostUserId: req.userId,
      date: parseISO(date),
      durationMinutes: eventType.duration_minutes,
    });

    return res.json({ slots });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao buscar disponibilidade' });
  }
}

async function createForHost(req, res) {
  try {
    const { eventTypeId, guestName, guestEmail, startTime } = req.body;

    const eventType = await eventTypeModel.findEventTypeById(eventTypeId);
    if (!eventType || eventType.user_id !== req.userId) {
      return res.status(404).json({ error: 'Tipo de evento não encontrado' });
    }

    const start = parseISO(startTime);
    const end = addMinutes(start, eventType.duration_minutes);

    const conflict = await availabilityService.hasConflict({
      hostUserId: req.userId,
      startTime: start,
      endTime: end,
    });

    if (conflict) {
      return res.status(409).json({
        error: 'Esse horário acabou de ser ocupado. Escolha outro horário disponível.',
      });
    }

    const booking = await bookingModel.createBooking({
      eventTypeId: eventType.id,
      hostUserId: req.userId,
      guestName,
      guestEmail,
      startTime: start,
      endTime: end,
    });

    return res.status(201).json({ booking });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao criar agendamento' });
  }
}

module.exports = {
  getAvailability,
  create,
  listMine,
  cancel,
  getAvailabilityForHost,
  createForHost,
};
const express = require('express');
const router = express.Router();

const eventTypeController = require('../controllers/eventTypeController');
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validators/authValidators');
const {
  createEventTypeRules,
  createBookingRules,
} = require('../middlewares/validators/bookingValidators');

// --- Rotas privadas (dono da agenda) ---
router.post('/', authenticate, createEventTypeRules, validate, eventTypeController.create);
router.get('/', authenticate, eventTypeController.listMine);
router.delete('/:id', authenticate, eventTypeController.remove);

// --- Rotas públicas (página de agendamento visível ao convidado) ---
router.get('/public/:username/:slug', eventTypeController.getPublic);
router.get('/public/:username/:slug/availability', bookingController.getAvailability);
router.post('/public/:username/:slug/bookings', createBookingRules, validate, bookingController.create);

module.exports = router;
const { body } = require('express-validator');

const createEventTypeRules = [
  body('title').trim().notEmpty().withMessage('Título é obrigatório'),
  body('durationMinutes')
    .optional()
    .isInt({ min: 5, max: 480 })
    .withMessage('Duração deve ser entre 5 e 480 minutos'),
];

const createBookingRules = [
  body('guestName').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('guestEmail').isEmail().withMessage('E-mail inválido'),
  body('startTime').isISO8601().withMessage('startTime deve ser uma data ISO 8601 válida'),
];

module.exports = { createEventTypeRules, createBookingRules };
const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');
const { validate } = require('../middlewares/validators/authValidators');
const { createManualBookingRules } = require('../middlewares/validators/bookingValidators');

router.get('/', authenticate, bookingController.listMine);
router.get('/availability/:eventTypeId', authenticate, bookingController.getAvailabilityForHost);
router.post('/', authenticate, createManualBookingRules, validate, bookingController.createForHost);
router.patch('/:id/cancel', authenticate, bookingController.cancel);

module.exports = router;
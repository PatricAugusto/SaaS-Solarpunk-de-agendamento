const express = require('express');
const router = express.Router();

const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middlewares/authMiddleware');

router.get('/', authenticate, bookingController.listMine);
router.patch('/:id/cancel', authenticate, bookingController.cancel);

module.exports = router;
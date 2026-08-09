const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/authMiddleware');

const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  validate,
} = require('../middlewares/validators/authValidators');

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.get('/me', authenticate, authController.me);
router.post('/forgot-password', forgotPasswordRules, validate, authController.forgotPassword);
router.post('/reset-password', resetPasswordRules, validate, authController.resetPassword);

module.exports = router;
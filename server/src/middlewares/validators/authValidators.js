const { body, validationResult } = require('express-validator');

const registerRules = [
  body('name').trim().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username deve ter no mínimo 3 caracteres')
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Username deve conter apenas letras minúsculas, números e hífen'),
];

const loginRules = [
  body('email').isEmail().withMessage('E-mail inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

const forgotPasswordRules = [
  body('email').isEmail().withMessage('E-mail inválido'),
];

const resetPasswordRules = [
  body('token').notEmpty().withMessage('Token é obrigatório'),
  body('newPassword').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
];

module.exports = {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  validate,
};
const { body } = require('express-validator');

exports.registerValidator = [
  body('first_name')
    .notEmpty().withMessage('First name wajib diisi.')
    .isLength({ min: 2 }).withMessage('First name minimal 2 karakter.'),
  
  body('last_name')
    .notEmpty().withMessage('Last name wajib diisi.')
    .isLength({ min: 2 }).withMessage('Last name minimal 2 karakter.'),
  
  body('email')
    .notEmpty().withMessage('Email wajib diisi.')
    .isEmail().withMessage('Format email tidak valid.'),
  
  body('password')
    .notEmpty().withMessage('Password wajib diisi.')
    .isLength({ min: 8 }).withMessage('Password minimal 8 karakter.')
];

exports.loginValidator = [
  body('email')
    .notEmpty().withMessage('Email wajib diisi.')
    .isEmail().withMessage('Format email tidak valid.'),
  
  body('password')
    .notEmpty().withMessage('Password wajib diisi.')
];
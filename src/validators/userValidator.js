const { body } = require('express-validator');

exports.updateUserValidator = [
  body('first_name')
    .notEmpty().withMessage('First name wajib diisi.')
    .isLength({ min: 2 }).withMessage('First name minimal 2 karakter.'),
  
  body('last_name')
    .notEmpty().withMessage('Last name wajib diisi.')
    .isLength({ min: 2 }).withMessage('Last name minimal 2 karakter.'),
];


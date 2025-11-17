const {body} = require('express-validator');

exports.topUpValidator = [
  body('top_up_amount')
    .notEmpty().withMessage('Amount wajib diisi.')
    .isFloat({gt: 0}).withMessage('Amount harus berupa angka lebih dari 0.'),
];

exports.transactionPaymentValidator = [
  body('service_code')
    .notEmpty().withMessage('Service code wajib diisi.')
    .isString().withMessage('Service code harus berupa string.'),
];
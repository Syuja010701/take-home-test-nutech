const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionsController');
const verifyToken = require('../middlewares/authMiddleware');
const {topUpValidator, transactionPaymentValidator} = require('../validators/transactionValidator');
const {handleValidation} = require('../middlewares/validationMiddleware');

router.post('/topup', verifyToken, topUpValidator, handleValidation, transactionController.createTransactionTopUP);
router.post('/transaction', verifyToken, transactionPaymentValidator, handleValidation,  transactionController.createTransactionPayment);
router.get('/transaction/history', verifyToken, transactionController.getHistory);

module.exports = router;


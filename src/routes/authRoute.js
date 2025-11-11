const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { registerValidator, loginValidator } = require('../validators/authValidator');
const { handleValidation } = require('../middlewares/validationMiddleware');


// Register route
router.post('/register', registerValidator,handleValidation, authController.register);

// Login route
router.post('/login',loginValidator,handleValidation, authController.login);

module.exports = router;
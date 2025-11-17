const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware');

router.get('/', verifyToken, usersController.getBalance);

module.exports = router;
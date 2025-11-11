const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
const verifyToken = require('../middlewares/authMiddleware');

// Contoh route
router.get('/',verifyToken, userController.getUsers, (req, res) => {
  res.json({
    message: 'Protected route accessed successfully!',
    user: req.user // payload dari JWT
  });
});

module.exports = router;

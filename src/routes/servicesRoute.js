const express = require("express");
const router = express.Router();
const servicesController = require("../controllers/servicesController");
const verifyToken = require("../middlewares/authMiddleware");
router.get("/", verifyToken, servicesController.getAllServies);
module.exports = router;

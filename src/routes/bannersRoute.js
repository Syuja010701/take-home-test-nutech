const express = require("express");
const router = express.Router();
const bannersController = require("../controllers/bannersController");
router.get("/", bannersController.getAllBanners);
module.exports = router;

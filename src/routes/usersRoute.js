const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const verifyToken = require("../middlewares/authMiddleware");
const { updateUserValidator } = require("../validators/userValidator");
const { handleValidation } = require("../middlewares/validationMiddleware");
const upload = require("../middlewares/uploadProfile");
router.get("/", verifyToken, userController.getProfile);
router.put(
  "/update",
  verifyToken,
  updateUserValidator,
  handleValidation,
  userController.updateUser
);
router.put(
  "/image",
  verifyToken,
  (req, res, next) => {
    upload.single("image")(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          status: false,
          message: err.message || "Upload error",
        });
      }
      next();
    });
  },
  userController.uploadProfileImage
);

module.exports = router;

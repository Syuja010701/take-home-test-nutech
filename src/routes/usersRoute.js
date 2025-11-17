const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");
const verifyToken = require("../middlewares/authMiddleware");
const { updateUserValidator } = require("../validators/userValidator");
const { handleValidation } = require("../middlewares/validationMiddleware");
const upload = require("../middlewares/uploadProfile");
const { responseJson } = require("../helpers/response");
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
        let message = err.message;

        if (err.code === "LIMIT_FILE_SIZE") {
          message = "Ukuran file terlalu besar, maksimal 5MB";
        }

        return responseJson(res, 400, 102, message, null);
      }
      next();
    });
  },
  userController.uploadProfileImage
);


module.exports = router;

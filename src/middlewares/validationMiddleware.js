const { validationResult } = require("express-validator");
const { responseJson } = require("../helpers/response");

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return responseJson(res, 400, 102, "Validation errors", { errors: errors.array() });
  }
  next();
};

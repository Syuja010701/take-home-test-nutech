const jwt = require("jsonwebtoken");
const { responseJson } = require("../helpers/response");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return responseJson(
      res,
      401,
      108,
      "Token tidak tidak valid atau kadaluwarsa",
      null
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return responseJson(
        res,
        401,
        108,
        "Token tidak tidak valid atau kadaluwarsa",
        null
      );
    }
    return responseJson(
      res,
      401,
      108,
      "Token tidak tidak valid atau kadaluwarsa",
      null
    );
  }
};

module.exports = verifyToken;

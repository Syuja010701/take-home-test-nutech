const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

const verifyToken = (req, res, next) => {
  // Ambil token dari header Authorization
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({
        status: false,
        message: "Token tidak tidak valid atau kadaluwarsa",
        data: null,
      });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({
          status: false,
          message: "Token tidak tidak valid atau kadaluwarsa",
          data: null,
        });
    }
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;

const bcrypt = require("bcrypt");
const UserModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { responseJson } = require("../helpers/response");

const SALT_ROUNDS = 10;

const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const data = await UserModel.createUser(
      first_name,
      last_name,
      email,
      hashedPassword
    );
   
    return responseJson(
      res,
      200,
      0,
      "Registrasi berhasil silahkan login",
      null
    );
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY'){
      return responseJson(res, 400, 102, "Email telah digunakan", null);
    }
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return responseJson(res, 401, 103, "Username dan password salah", null);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return responseJson(res, 401, 103, "Username dan password salah", null);
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    delete user.password;
    delete user.created_at;
    delete user.profile_image;

    return responseJson(res, 200, 0, "Login Sukses", { token: token });
  } catch (err) {
    console.error("Login error:", err);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

module.exports = { register, login };

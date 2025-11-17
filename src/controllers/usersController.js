const bcrypt = require("bcrypt");
const UserModel = require("../models/usersModel");
const SALT_ROUNDS = 10;
const { put, del } = require("@vercel/blob");
const { responseJson } = require("../helpers/response");
const getProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await UserModel.findUserByEmail(email);

    delete data.password;
    delete data.created_at;

    return responseJson(res, 200, 0, "Sukses", data);
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const id = await UserModel.createUser(name, email, hashedPassword);
    res.status(201).json({ message: "User created", id });
  } catch (err) {
    console.error("createUser error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { first_name, last_name } = req.body;
  const email = req.user.email;

  try {
    const updatedUser = await UserModel.updateUser(
      email,
      first_name,
      last_name
    );

    delete updateUser.password;
    delete updateUser.created_at;
    return responseJson(res, 200, 0, "Update Profile berhasil", updatedUser);
  } catch (error) {
    console.error("updateUser error:", error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await UserModel.findUserByEmail(email);

    if (!req.file) {
      return responseJson(res, 400, 101, "File tidak ditemukan", null);
    }

    const { url } = await put(
      `profile_${Date.now()}_${req.file.originalname}`,
      req.file.buffer,
      {
        access: "public",
        contentType: req.file.mimetype,
      }
    );

    if (user.profile_image?.startsWith("https://")) {
      await del(user.profile_image);
    }

    const updatedUser = await UserModel.updateUserImage(email, url);
    delete updatedUser.password;
    delete updatedUser.created_at;

    return responseJson(
      res,
      200,
      0,
      "update profile image berhasil",
      updatedUser
    );
  } catch (err) {
    console.error(err);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const getBalance = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await UserModel.findUserByEmail(email);

    return responseJson(res, 200, 0, "Get Balance Berhasil", {
      balance: user.balance,
    });
  } catch (error) {
    console.error(error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

module.exports = { createUser, getProfile, updateUser, uploadProfileImage, getBalance };

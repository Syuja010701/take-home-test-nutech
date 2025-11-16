const bcrypt = require("bcrypt");
const UserModel = require("../models/usersModel");
const SALT_ROUNDS = 10;
const { put, del } = require("@vercel/blob");

const getProfile = async (req, res) => {
  try {
    const email = req.user.email;
    const data = await UserModel.findUserByEmail(email);

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    delete data.password;
    delete data.created_at;

    return res.status(200).json({
      status: true,
      message: "Profile fetched successfully",
      profile: data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server error" });
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
    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateUser error:", error);
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    const email = req.user.email;
    const user = await UserModel.findUserByEmail(email);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload ke Vercel Blob
    const { url } = await put(
      `profile_${Date.now()}_${req.file.originalname}`,
      req.file.buffer,
      {
        access: "public",
        contentType: req.file.mimetype
      }
    );

    // Hapus image lama jika ada
    if (user.profile_image?.startsWith("https://")) {
      await del(user.profile_image);
    }

    const updatedUser = await UserModel.updateUserImage(email, url);

    return res.json({
      status: true,
      message: "Profile image updated",
      data: updatedUser,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { createUser, getProfile, updateUser, uploadProfileImage };

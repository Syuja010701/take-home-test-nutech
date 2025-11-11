const { pool } = require("../config/db");

// Ambil semua user
const getAllUsers = async () => {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
};

// Ambil 1 user by ID
const getUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

// Tambah user baru (untuk register)
// Expect: (first_name, last_name, email, password)
const createUser = async (first_name, last_name, email, password) => {
  const [result] = await pool.execute(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [first_name, last_name, email, password]
  );
  const [user] = await pool.execute(
    "SELECT id, first_name, last_name, email FROM users WHERE id = ?",
    [result.insertId]
  );

  return user[0];
};

const findUserByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );
  return rows[0];
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  findUserByEmail
};

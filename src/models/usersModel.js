const { pool } = require("../config/db");

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
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

const updateUser = async (email, first_name, last_name) => {
  await pool.execute(
    `UPDATE users SET first_name = ?, last_name = ? WHERE email = ?`,
    [first_name, last_name, email]
  );

  const [rows] = await pool.execute(
    "SELECT id, first_name, last_name, email, profile_image FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};

const updateUserImage = async (email, imagePath) => {
  await pool.execute(`UPDATE users SET profile_image = ? WHERE email = ?`, [
    imagePath,
    email,
  ]);

  const [rows] = await pool.execute(
    "SELECT id, first_name, last_name, email, profile_image FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};
module.exports = {
  createUser,
  findUserByEmail,
  updateUser,
  updateUserImage,
};

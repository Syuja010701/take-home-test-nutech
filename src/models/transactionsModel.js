const { pool } = require("../config/db");
const generateInvoiceNumber = require("../helpers/generateInvoice");

const createTransactionTopUP = async (user_id, amount) => {
  const invoice_number = await generateInvoiceNumber();

  const [result] = await pool.execute(
    "INSERT INTO transactions (user_id, invoice_number, total_amount, transaction_type) VALUES (?, ?, ?,?)",
    [user_id, invoice_number, amount, "TOPUP"]
  );

  await pool.execute("UPDATE users SET balance = balance + ? WHERE id = ?", [
    amount,
    user_id,
  ]);

  const [user] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    user_id,
  ]);
  return user[0].balance;
};

const createTransactionPayment = async (
  user_id,
  service_code,
  amount,
  type
) => {
  const invoice_number = await generateInvoiceNumber();

  const [result] = await pool.execute(
    "INSERT INTO transactions (user_id, invoice_number, transaction_type, service_code, total_amount) VALUES (?, ?, ?, ?, ?)",
    [user_id, invoice_number, type, service_code, amount]
  );

  await pool.execute("UPDATE users SET balance = balance - ? WHERE id = ?", [
    amount,
    user_id,
  ]);

  const [transaction] = await pool.execute(
    "SELECT * FROM transactions WHERE id = ?",
    [result.insertId]
  );

  return transaction[0];
};

const historyTransaction = async (email, limit = 0, offset = 0) => {
  const [userRows] = await pool.execute(
    "SELECT id FROM users WHERE email = ?",
    [email]
  );

  if (userRows.length === 0) return [];
  const userId = userRows[0].id;

  if (!limit || Number(limit) === 0) {
    const [transactions] = await pool.execute(
      "SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_id = ? ORDER BY created_on DESC",
      [userId]
    );

    return transactions;
  }

  const [transactions] = await pool.execute(
    `SELECT invoice_number, transaction_type, description, total_amount, created_on FROM transactions WHERE user_id = ${userId} ORDER BY created_on DESC LIMIT ${limit} OFFSET ${offset}`
  );

  return transactions;
};

module.exports = {
  createTransactionTopUP,
  createTransactionPayment,
  historyTransaction,
};

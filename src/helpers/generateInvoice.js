const { pool } = require("../config/db");

const generateInvoiceNumber = async () => {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const datePart = `${day}${month}${year}`;

  const [rows] = await pool.execute(
    "SELECT invoice_number FROM transactions WHERE invoice_number LIKE ? ORDER BY id DESC LIMIT 1",
    [`INV${datePart}-%`]
  );

  let nextNumber = 1;

  if (rows.length > 0) {
    const lastInvoice = rows[0].invoice_number; 
    const lastCounter = parseInt(lastInvoice.split("-")[1]); 
    nextNumber = lastCounter + 1;
  }

  const paddedCounter = String(nextNumber).padStart(3, "0");

  return `INV${datePart}-${paddedCounter}`;
};

module.exports = generateInvoiceNumber;

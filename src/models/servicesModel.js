const { pool } = require("../config/db");

const getAllServies = async () => {

  const user = await pool.execute(
    "SELECT * FROM services" 
  );

  return user;
};
module.exports = {
 getAllServies
};

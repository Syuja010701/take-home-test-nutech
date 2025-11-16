const { pool } = require("../config/db");

const getAllBanners = async () => {

  const user = await pool.execute(
    "SELECT * FROM banners" 
  );

  return user;
};
module.exports = {
 getAllBanners
};

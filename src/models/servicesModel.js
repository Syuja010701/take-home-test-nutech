const { pool } = require("../config/db");

const getAllServies = async () => {

  const services = await pool.execute(
    "SELECT * FROM services" 
  );

  return services;
};

const findServiceByCode = async (code) => {
  const [service] = await pool.execute(
    "SELECT * FROM services WHERE service_code = ?",
    [code]
  );

  return service[0];
}

module.exports = {
 getAllServies, findServiceByCode
};

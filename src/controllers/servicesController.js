const { responseJson } = require("../helpers/response");
const servicesModel = require("../models/servicesModel");
const getAllServies = async (req, res) => {
  try {
    const [services] = await servicesModel.getAllServies();
    return responseJson(res, 200, 0, "sukses", services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return responseJson(res, 500, 1, "Internal Server Error", null);
  }
};

module.exports = {
  getAllServies,
};

const servicesModel = require("../models/servicesModel");
const getAllServies = async (req, res) => {
  try {
    const [services] = await servicesModel.getAllServies();
    res.status(200).json({ status: true, message: "sukses", data: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res
      .status(500)
      .json({ status: false, message: "Internal server error", data: null });
  }
};

module.exports = {
  getAllServies,
};
const bannersModel = require("../models/bannersModel");
const getAllBanners = async (req, res) => {
  try {
    const [banners] = await bannersModel.getAllBanners();
    res.status(200).json({ status: true, message: "sukses", data: banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res
      .status(500)
      .json({ status: false, message: "Internal server error", data: null });
  }
};

module.exports = {
  getAllBanners,
};
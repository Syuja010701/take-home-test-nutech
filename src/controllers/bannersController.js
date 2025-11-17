const bannersModel = require("../models/bannersModel");
const { responseJson } = require("../helpers/response");
const getAllBanners = async (req, res) => {
  try {
    const [banners] = await bannersModel.getAllBanners();
    return responseJson(res, 200, 0, "Sukses", banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return responseJson(res, 500, 1, "Internal Server Error", null);
  }
};

module.exports = {
  getAllBanners,
};

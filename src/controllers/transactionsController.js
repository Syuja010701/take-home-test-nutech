const TransactionModel = require("../models/transactionsModel");
const { responseJson } = require("../helpers/response");
const { findUserByEmail } = require("../models/usersModel");
const ServiceModel = require("../models/servicesModel");
const { del } = require("@vercel/blob");

const createTransactionTopUP = async (req, res) => {
  const { top_up_amount } = req.body;
  const user = await findUserByEmail(req.user.email);

  try {
    const transaction = await TransactionModel.createTransactionTopUP(
      user.id,
      top_up_amount
    );

    return responseJson(res, 200, 0, "Top Up Balance berhasil", transaction);
  } catch (error) {
    console.error("createTransaction error:", error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const createTransactionPayment = async (req, res) => {
  const type = "PAYMENT";

  const user = await findUserByEmail(req.user.email);

  const amount = user.balance;
  const service = await ServiceModel.findServiceByCode(req.body.service_code);

  if (!service) {
    return responseJson(
      res,
      400,
      102,
      "Service ataus Layanan tidak ditemukan",
      null
    );
  }

  const serviceAmount = service.service_tariff;

  if (amount < serviceAmount) {
    return responseJson(
      res,
      400,
      103,
      "saldo anda tidak cukup silahkan melakukan top up",
      null
    );
  }

  try {
    const transaction = await TransactionModel.createTransactionPayment(
      user.id,
      req.body.service_code,
      serviceAmount,
      type
    );

    return responseJson(
      res,
      200,
      0,
      "Transaction created successfully",
      transaction
    );
  } catch (error) {
    console.error("createTransaction error:", error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};

const getHistory = async (req, res) => {
  try {
    const offset = req.query.offset ? Number(req.query.offset) : 0;
    const limit  = req.query.limit ? Number(req.query.limit) : 0;

    const transactions = await TransactionModel.historyTransaction(
      req.user.email,
      limit,   
      offset   
    );

    return responseJson(res, 200, 0, "Success", {
      offset,
      limit,
      records: transactions,
    });

  } catch (error) {
    console.error(error);
    return responseJson(res, 500, 500, "Terjadi kesalahan pada server", null);
  }
};


module.exports = {
  createTransactionTopUP,
  createTransactionPayment,
  getHistory,
};

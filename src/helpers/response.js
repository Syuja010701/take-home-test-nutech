const responseJson = (res, statusCode = 200, status = 0, message = "", data = null) => {
   return res.status(statusCode).json({
      status,
      message,
      data,
    });
};

module.exports = {
  responseJson,
};
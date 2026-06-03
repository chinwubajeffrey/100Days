const errHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errMsg = err.message || "Something went wrong";
  res.status(statusCode).json({
    statusCode: statusCode,
    errorMessage: errMsg,
  });
};

module.exports = errHandler;

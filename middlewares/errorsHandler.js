function errorsHandler(err, req, res, next) {
  console.log(err.message);
  res.status(500).json({
    success: false,
    result: "Internal server error",
  });
}
module.exports = errorsHandler;

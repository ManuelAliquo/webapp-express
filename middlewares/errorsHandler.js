function errorsHandler(err, req, res, next) {
  console.log(err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
}
module.exports = errorsHandler;

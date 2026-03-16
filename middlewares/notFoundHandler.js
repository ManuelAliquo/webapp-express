function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    result: "Page not found",
  });
}
module.exports = notFoundHandler;

function failedQueryHandler(err, res) {
  return res.status(500).json({
    success: false,
    result: "Database query failed",
  });
}

module.exports = failedQueryHandler;

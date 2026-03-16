function requestLogger(req, res, next) {
  const currentDate = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()} - ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

  console.log(`(${currentDate}) ${req.method} ${req.url}`);

  next();
}

module.exports = requestLogger;

const express = require("express");
const app = express();
// router import
const moviesRouter = require("./routers/moviesRouter");
// error handlers import
const notFoundHandler = require("./middlewares/notFoundHandler");
const errorsHandler = require("./middlewares/errorsHandler");
// req logger import
const requestLogger = require("./middlewares/requestLogger");

// middlewares
app.use(requestLogger);
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/movies", moviesRouter);

// error handlers
app.use(notFoundHandler);
app.use(errorsHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server listening on ${process.env.APP_URL}:${process.env.APP_PORT}`),
);

const express = require("express");
const app = express();
// router import
const moviesRouter = require("./routers/moviesRouter");
// notFound import
const notFoundHandler = require("./middlewares/notFoundHandler");

// middlewares
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/movies", moviesRouter);

// error handlers
app.use(notFoundHandler);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server listening on ${process.env.APP_URL}:${process.env.APP_PORT}`),
);

const express = require("express");
const app = express();
// router import
const moviesRouter = require("./routers/moviesRouter.js");

// middlewares
app.use(express.json());
app.use(express.static("public"));

app.use("/movies", moviesRouter);

app.listen(process.env.APP_PORT, () =>
  console.log(`Server listening on ${process.env.APP_URL}:${process.env.APP_PORT}`),
);

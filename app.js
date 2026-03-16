const express = require("express");
const app = express();

const port = 3000;
const appUrl = `http://localhost:${port}/`;

// middlewares
app.use(express.json());
app.use(express.static("public"));

// db connection
const connection = require("./db/connection.js");

// routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WIP",
  });
});

app.listen(port, () => console.log(`Server listening on ${appUrl}`));

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
  const moviesSQL = "SELECT * FROM movies_db.movies;";

  connection.query(moviesSQL, (err, results) => {
    if (err)
      return res.status(500).json({
        success: false,
        message: "Database query failed",
      });

    res.status(200).json({
      success: true,
      result: results,
    });
  });
});

app.listen(port, () => console.log(`Server listening on ${appUrl}`));

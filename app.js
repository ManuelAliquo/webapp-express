const express = require("express");
const app = express();

const port = 3000;
const appUrl = `http://localhost:${port}/`;

// middlewares
app.use(express.json());
app.use(express.static("public"));

// db connection
const connection = require("./db/connection.js");

//* routes

// index
app.get("/", (req, res) => {
  const moviesSQL = "SELECT * FROM movies;";

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

// show
app.get("/:id", (req, res) => {
  const { id } = req.params;

  const moviesSQL = "SELECT * FROM movies WHERE id = ?";

  connection.query(moviesSQL, [id], (err, movieResults) => {
    if (err)
      return res.status(500).json({
        success: false,
        result: "Database query failed",
      });

    const [movie] = movieResults;

    const reviewsSQL = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(reviewsSQL, [id], (err, reviewResults) => {
      if (err)
        return res.status(500).json({
          success: false,
          result: "Database query failed",
        });

      movie.reviews = reviewResults;

      res.status(200).json({
        success: true,
        result: movie,
      });
    });
  });
});

app.listen(port, () => console.log(`Server listening on ${appUrl}`));

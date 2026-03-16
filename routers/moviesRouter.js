const express = require("express");
const connection = require("../db/connection.js");
const router = express.Router();

// index
router.get("/", (req, res) => {
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
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const moviesSQL = "SELECT * FROM movies WHERE id = ?";

  connection.query(moviesSQL, [id], (err, movieResults) => {
    if (err)
      return res.status(500).json({
        success: false,
        result: "Database query failed",
      });

    const [movie] = movieResults;

    if (!movie)
      return res.status(404).json({
        success: false,
        result: "Resource not found",
      });

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

module.exports = router;

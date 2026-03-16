// db connection
const connection = require("../db/connection");

// failed query handler import
const failedQueryHandler = require("../middlewares/failedQueryHandler");

// index
function index(req, res) {
  const moviesSQL = "SELECT * FROM movies;";

  connection.query(moviesSQL, (err, results) => {
    if (err) return failedQueryHandler(err, res);

    res.status(200).json({
      success: true,
      result: results,
    });
  });
}

// show
function show(req, res) {
  const { id } = req.params;

  const moviesSQL = "SELECT * FROM movies WHERE id = ?";

  connection.query(moviesSQL, [id], (err, movieResults) => {
    if (err) return failedQueryHandler(err, res);

    const [movie] = movieResults;

    if (!movie)
      return res.status(404).json({
        success: false,
        result: "Resource not found",
      });

    const reviewsSQL = "SELECT * FROM reviews WHERE movie_id = ?";

    connection.query(reviewsSQL, [id], (err, reviewResults) => {
      if (err) return failedQueryHandler(err, res);

      movie.reviews = reviewResults;

      res.status(200).json({
        success: true,
        result: movie,
      });
    });
  });
}

module.exports = { index, show };

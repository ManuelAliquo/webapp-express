// db connection
const connection = require("../db/connection");

// failed query handler import
const failedQueryHandler = require("../utils/failedQueryHandler");

// movie vover builder import
const movieCoverPathBuilder = require("../utils/movieCoverPathBuilder");

// index
function index(req, res) {
  const moviesSQL = `
  SELECT
    movies.id,
    movies.title,
    movies.director,
    movies.genre,
    movies.release_year,
    movies.abstract,
    movies.image,
    AVG(reviews.vote) AS average_vote
  FROM movies
  INNER JOIN reviews ON reviews.movie_id = movies.id
  GROUP BY movies.id;`;

  connection.query(moviesSQL, (err, movieResults) => {
    if (err) return failedQueryHandler(err, res);

    const movies = movieResults.map((movie) => {
      return { ...movie, image: movieCoverPathBuilder(movie.image) };
    });

    res.status(200).json({
      success: true,
      result: movies,
    });
  });
}

// show
function show(req, res) {
  const { id } = req.params;

  const moviesSQL = `
  SELECT
    id,
    title,
    director,
    genre,
    release_year,
    abstract,
    image
  FROM movies
  WHERE id = ?;`;

  connection.query(moviesSQL, [id], (err, movieResults) => {
    if (err) return failedQueryHandler(err, res);

    const [movies] = movieResults.map((movie) => {
      return { ...movie, image: movieCoverPathBuilder(movie.image) };
    });

    if (!movies)
      return res.status(404).json({
        success: false,
        result: "Resource not found",
      });

    const reviewsSQL = `
    SELECT 
      id,
      name AS username,
      vote,
      text,
      DATE(created_at) AS creation_date,
	    DATE(updated_at) AS update_date
    FROM reviews
    WHERE movie_id = ?;`;

    connection.query(reviewsSQL, [id], (err, reviewResults) => {
      if (err) return failedQueryHandler(err, res);

      movies.reviews = reviewResults;

      res.status(200).json({
        success: true,
        result: movies,
      });
    });
  });
}

module.exports = { index, show };

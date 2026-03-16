function movieCoverPathBuilder(image) {
  return `${process.env.APP_URL}:${process.env.APP_PORT}/img/movies_cover/${image}`;
}

module.exports = movieCoverPathBuilder;

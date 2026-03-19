const express = require("express");
const router = express.Router();
// controller import
const movieController = require("../controllers/movieController");

// index
router.get("/", movieController.index);
// show
router.get("/:id", movieController.show);
// review store
router.post("/:id/review", movieController.storeReview);

module.exports = router;

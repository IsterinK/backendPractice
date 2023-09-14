const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies")

router.get("/", moviesController.getAllMovies)
router.get("/mov/:movieName", moviesController.getMovieByName)

module.exports = router;
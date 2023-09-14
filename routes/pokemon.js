const express = require("express");
const router = express.Router();
const pokemonController = require('../controllers/pokemon');


router.get("/", pokemonController.getAll)
router.get("/pokemon/:pokemonName", pokemonController.getByName)

module.exports = router;
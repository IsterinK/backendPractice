const express = require("express");
const router = express.Router();
const pokemonController = require('../controllers/pokemon');


router.get("/", pokemonController.getAll)
router.get("/:pokemonName", pokemonController.getByName)

module.exports = router;
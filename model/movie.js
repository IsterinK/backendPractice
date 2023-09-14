const mongoose = require('mongoose');

const movieSchema=mongoose.Schema({
    adult: {type: Boolean},
    genres: {type: Array},
    id: {type: Number},
    original_language: {type: String},
    original_title: {type: String},
    overview: {type: String},
    production_companies: {type: Array},
    production_countries: {type: Array},
    release_date: {type: Date},
    runtime: {type: Number},
    status: {type: String},
    title: {type: String}

})

module.exports = mongoose.model("Movie", movieSchema)
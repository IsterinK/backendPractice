const mongoose = require('mongoose')

const pokemonSchema=mongoose.Schema({
    abilities: {type : Array},
    base_experience: {type: Number},
    forms: {type: Array},
    game_indices: {type:Array},
    height: { type: Number },
    held_items: { type: Array },
    id: { type: Number },
    is_default:{ type: Boolean },
    moves: { type: Array },
    name: { type: String },
    order: { type: Number },
    species:{ type: Object },
    weight: {type: Number},
    image:{type: String}
})

module.exports = mongoose.model("Pokemon", pokemonSchema)
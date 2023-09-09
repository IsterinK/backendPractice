//Importacion de librerias
const bodyParser = require("body-parser")
const express = require("express")
const addressRoutes = require("./routes/address")
const pokemonRoutes = require("./routes/pokemon")
const dotenv = require('dotenv').config();

const app = express()

//Visualizacion del contenido del endpoint o envio del contenido
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/addresses`, addressRoutes);
app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/pokemons`, pokemonRoutes);

module.exports = app
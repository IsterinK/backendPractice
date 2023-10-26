//Importacion de librerias
const bodyParser = require("body-parser")
const express = require("express")
const addressRoutes = require("./routes/address")
const pokemonRoutes = require("./routes/pokemon")
const moviesRoutes = require("./routes/movies")
const userRoutes = require("./routes/user")
const postRoutes = require("./routes/post")
const dotenv = require('dotenv').config();
const cors = require('cors')

const app = express()

//Visualizacion del contenido del endpoint o envio del contenido
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(cors());

app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/addresses`, addressRoutes);
app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/pokemons`, pokemonRoutes);
app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/movies`, moviesRoutes);
app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/posts`, postRoutes);
app.use(`/${process.env.API_PATH}/${process.env.API_VERSION}/users`, userRoutes);

module.exports = app
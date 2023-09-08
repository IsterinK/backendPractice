//Importacion de librerias
const bodyParser = require("body-parser")
const express = require("express")
const addressRoutes = require("./routes/address")

//Importacion de archivos
const { API_PATH, PORT } = require('./variables')

const app = express()

//Visualizacion del contenido del endpoint o envio del contenido
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static("uploads"));
app.use('/uploads', express.static('uploads'));

app.use(`/${API_PATH}/addresses`, addressRoutes);

module.exports = app
//Importaciones Librerias
const mongoose = require("mongoose")

//Importaciones archivos 
const app = require('./app')
const dotenv = require('dotenv').config();

//Conexión a la base de datos
const connection_string = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}/` 

mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>
        {
            app.listen(process.env.PORT)
        })
    .catch((err)=>console.error(err))


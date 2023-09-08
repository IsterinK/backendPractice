//Importaciones Librerias
const mongoose = require("mongoose")

//Importaciones archivos 
const app = require('./app')
const dotenv = require('dotenv').config();

//Conexión a la base de datos
const connection_string = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@${process.env.DB_HOST}/` 
console.log(connection_string);

mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>
        {
            console.log('Conexion exitosa')
            app.listen(process.env.PORT, ()=>console.log(`IP SERVER:\nhttp://${process.env.HOST}:${process.env.PORT}/${process.env.API_PATH}/${process.env.API_VERSION}`))
        })
    .catch((err)=>console.error(err))


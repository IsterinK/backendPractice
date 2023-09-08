//Importaciones Librerias
const mongoose = require("mongoose")

//Importaciones archivos 
const {DB_HOST, USERNAME, PASSWORD , HOST, PORT, API_PATH} = require('./variables')
const app = require('./app')


//Conexión a la base de datos
const connection_string = `mongodb+srv://${USERNAME}:${PASSWORD}@${DB_HOST}/` 

mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>
        {
            console.log('Conexion exitosa')
            app.listen(PORT, ()=>console.log(`IP SERVER:\nhttp://${HOST}:${PORT}/${API_PATH}`))
        })
    .catch((err)=>console.error(err))


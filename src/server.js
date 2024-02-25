//librerias
const express = require('express');

//llamado a otros documentos
const { dbConnection } = require('./database/conexiondb');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 4100

        //conectar base de datos
        this.conectarDB();

        //routers
        this.routers() ;
        
    }
    async conectarDB(){
        await dbConnection();
    }
    routers(){
        this.app.get('/', function (req, res) {
            res.send('Conexion a la base de datos');
        });
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log("Servidor Corriendo en el Puerto:", this.port)
        })
    }
}
module.exports={
    Server
}
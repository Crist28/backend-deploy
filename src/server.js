//librerias
const express = require('express');

//llamado a otros documentos
// const { dbConnection } = require('./config/database');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 4100

        //routers
        this.routers() ;
        
    }
    routers(){
        this.app.get('/', function (req, res) {
            res.send('Hello World Myrian Hernandez');
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
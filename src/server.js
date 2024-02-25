//librerias
const express = require('express');
const cors = require('cors');

//llamado a otros documentos
const { dbConnection } = require('./database/conexiondb');

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT || 4100

        this.routersCliente = '/api';

        this.middlewares();

        //conectar base de datos
        this.conectarDB();

        //routers
        this.routers() ;
        
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
    }
    async conectarDB(){
        await dbConnection();
    }
    routers(){
        this.app.get('/', function (req, res) {
            res.send('Conexion a la base de datos');
        });
        this.app.use(this.routersCliente, require("./routes/Cliente"));
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

const city = require('./ciudad')
const client = require('./clientes')
const mysql = require('mysql2')  
const conexion = mysql.createConnection(
{
host:'localhost',
database:'EjercicioClientes',
user:'root',
password:'',
})

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { throws } = require('assert');
const app = express();


app.use(cors());


app.use(function(req, res, next) {
         res.setHeader('Access-Control-Allow-Origin', '*')
         res.setHeader('Access-Control-Allow-Methods', '*')
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', '*')
         next()
    })



app.use(bodyParser.json())
const PUERTO = 3000;


conexion.connect(error=>{
    if(error) throw error
    console.log('Conexion a base de datos exitosa');
})

app.listen(PUERTO, () => {
    console.log('Servidor iniciado en el puerto: ',PUERTO);
})


city.RegisterCiudad(app);
client.RegisterCliente(app);
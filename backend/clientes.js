const moduleName = "clientes";
const mysql = require('mysql2')  
const conexion = mysql.createConnection(
    {
    host:'localhost',
    database:'EjercicioClientes',
    user:'root',
    password:'',
    })
// -- LISTAR Cliente --
function RegisterCliente(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName} ORDER BY id asc`
        conexion.query(query, (error, resultado) => {
            if(error) return console.error(error.message)
    
            if(resultado.length > 0) {
                res.json(resultado)
            }else{
                res.json('No hay registros')
            }
            });
    })
    
// -- LISTAR MEDIANTE ID --
    app.get(`/${moduleName}/:id`,(req,res)=>{
        const {id} = req.params;
        const query = `SELECT * FROM ${moduleName} WHERE id=${id}`;
        conexion.query(query, (error, resultado)=>{
            if(error) return console.error(error.message)
    
            if(resultado.length > 0){
                console.log(resultado); 
            res.json(resultado);
            }else{
                res.json('No hay registros con ese ID')
            }
        })
    })

// -- AGREGAR Cliente --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const Cliente = {
        doc: req.body.doc,
        nombre: req.body.nombre,
        ciudades_CodCiudad: req.body.ciudades_CodCiudad,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, Cliente, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente`)

    })
})



// -- ACTUALIZAR Cliente --
app.put(`/${moduleName}/editar/:id`,(req,res)=>{
    const {id} = req.params;
    const {doc} = req.body;
    const {nombre} = req.body;
    const {ciudades_CodCiudad} = req.body;
    const query = `UPDATE ${moduleName} SET doc ='${doc}', SET nombre = '${nombre}', SET '${ciudades_CodCiudad}' WHERE idCliente=${id}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)   

        res.json("Se ha actualizado correctamente");
    })
})

// -- ELIMINAR Cliente --
app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
    const {id} = req.params;
    const query = `DELETE FROM ${moduleName} WHERE id=${id}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json("Se ha eliminado correctamente");
    })
})

}

module.exports = {RegisterCliente};

const moduleName = "ciudades";
const mysql = require('mysql2')  
const conexion = mysql.createConnection(
    {
    host:'bd1-2693505.mysql.database.azure.com',
    database:'ejercicioclienteseduardobalza',
    user:'heiver',
    password:'12345678Te$',
    })
// -- LISTAR CIUDAD --
function RegisterCiudad(app){
    app.get(`/${moduleName}`, (req, res) => {
        console.log('ejecutando query');
        const query = `SELECT * FROM ${moduleName} ORDER BY Cod_Ciudad asc`
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
        const query = `SELECT * FROM ${moduleName} WHERE Cod_Ciudad=${id}`;
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

// -- AGREGAR CIUDAD --
app.post(`/${moduleName}/agregar`,(req,res)=>{
        
    const ciudad = {
        Nom_Ciudad: req.body.Nom_Ciudad,
    }
    const query = `INSERT INTO ${moduleName} SET ?`;
    conexion.query(query, ciudad, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json(`Se insertó correctamente`)

    })
})



// -- ACTUALIZAR CIUDAD --
app.put(`/${moduleName}/editar/:id`,(req,res)=>{
    const {id} = req.params;
    const {Nom_Ciudad} = req.body;
    const query = `UPDATE ${moduleName} SET Nom_Ciudad = '${Nom_Ciudad}' WHERE idCiudad=${Cod_Ciudad}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)   

        res.json("Se ha actualizado correctamente");
    })
})

// -- ELIMINAR CIUDAD --
app.delete(`/${moduleName}/borrar/:id`,(req,res)=>{
    const {id} = req.params;
    const query = `DELETE FROM ${moduleName} WHERE Cod_Ciudad=${id}`;
    conexion.query(query, (error, resultado)=>{
        if(error) return console.error(error.message)

        res.json("Se ha eliminado correctamente");
    })
})

}
module.exports = {RegisterCiudad};

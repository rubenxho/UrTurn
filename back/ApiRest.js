const express =require("express");
const app =  express();    
const cors = require('cors')
const mysql = require('mysql2') 


//Creo un servidor
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//Uso cors
app.use(cors())

//MYSQL Creo una conexion, con los datos de mi bd
let connection = mysql.createConnection({
    host: "urturn.ctfgjcxfjdpu.us-east-2.rds.amazonaws.com",
    user: "urturn6",
    password: "urturn123",
    database: "urturn",
});

//MYSQL Ejecuto la conexion a la bd
connection.connect(function (err, res) {
    if (err) console.log(err);
    else console.log("Conectado!");
});


app.get("/favoritos",
    function(request, response){
        let categoria=request.query.categoria
        let categoria_param=""
        let cp=request.query.cp
        let id= request.query.id
        let params=[categoria, cp, id]
        sql=`SELECT e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f JOIN urturn.usuario_empresa 
        AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) JOIN urturn.usuario_cliente 
        AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) WHERE e.categoria=? AND codigo_postal=?
        AND f.id_usuario_cliente=?`
        if(categoria=="restauracion" ){
            categoria_param="restauracion"
        }

        else if(categoria=="deporte" ){
            categoria_param="deporte"
        }

        else if(categoria=="belleza" ){
            categoria_param="belleza"
        }

        else if(categoria=="hogar" ){
            categoria_param="hogar"
        }
        
        else if(categoria=="moda" ){
            categoria_param="moda"
        }

        else if(categoria=="ocio" ){
            categoria_param="ocio"
        }

        else if(categoria=="salud" ){
            categoria_param="salud"
        }

        else if(categoria=="alimentacion" ){
            categoria_param="alimentacion"
        }

        connection.query(sql,params,
            function(err,res){
                if(err){
                    console.log(err);
                }
                else {
                    console.log(res)
                    response.send(res);
                }
        })
    })
    

/******************************ENDPOINT PUNTUACIO****************************************************/

app.post('/puntuacion', (req, res) => {
    console.log(req.body);
    let params = [
        req.body.id_usuario_cliente,
        req.body.id_usuario_empresa,
        req.body.date
    ];
    connection.query (`INSERT INTO puntuacion (id_usuario_cliente, id_usuario_empresa, date)
                        VALUES (?,?,?)`,

                    params,

                    (err, newPuntuacion) => {

                        if (err){

                            console.log(err);
                            res.send(err);

                        }else{

                            console.log(newPuntuacion);
                            res.send({error: false, codigo: 200, mensaje: 'Añadida nueva puntuación'});

                        }
                    });                  
});

/*********************************************************************************************************/
/********************************ENDPOINT LOCALES*********************************************************/

app.get('/local', (req, res) => {
    
    let sqlByID = `SELECT nombre_empresa, direccion, tiempo_espera, descripcion, apertura, cierre, imagen_url
                    FROM usuario_empresa
                    WHERE id_usuario_empresa = ?`;
    let sqlAll = `SELECT nombre_empresa, tiempo_espera FROM urturn.usuario_empresa
                    WHERE (categoria = ? AND codigo_postal = ?);`;
    let id = req.query.id;
    let busqueda = [
        req.query.categoria,
        req.query.codigo_postal
    ];    
    
    if(id){
        connection.query(sqlByID, id, (err, result) => {
            
            if(err){

                console.log(err);
                res.send(err);

            }else if(result){

                res.json(result);

            }else{

                res.json({error: false, codigo: 200, mesaje: 'Búsqueda correcta'}); 
            }
        });
    }else if(busqueda){
        connection.query(sqlAll, busqueda, (err, result) => {
            
            if(err){

                console.log(err);
                res.send(err);

            }else if(result){

                res.json(result);

            }else{

                res.json({error: false, codigo: 200, mesaje: 'Búsqueda correcta'}); 
            }
        });
    } 
});

/************************************************************************************/

app.listen(3000);
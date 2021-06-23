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

let salida = '';

// app.get("/discos", function (request,response) {
//         let id = request.query.id_disco;
//         if(id){
//             let params =[id]
//             let sql= 'SELECT * FROM usuario_cliente'
//             connection.query(sql,params, 
//                 function(err, res){
//                     if(err){
//                      console.log(err);
//                      response.send({error: true, codigo: 200, mensaje: 'El disco no existe'})
//                      }
//                     else{
//                      console.log(res)
//                      response.send(res)
//                     }
//                 }
            
//            )}
    
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
                    WHERE (categoria = ? AND codigo_postal = ?)`;
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

app.get('/login', (request, response) =>   {
    let params = [request.body.email, request.body.contraseña,
                    request.body.email, request.body.contraseña];

    let sql = `SELECT uc.id_usuario_cliente FROM usuario_cliente AS uc 
                INNER JOIN login as l on (uc.id_usuario_cliente = l.id_usuario_cliente) 
                WHERE l.email = ? and l.contraseña = ?
                UNION
                SELECT ue.id_usuario_empresa FROM usuario_empresa AS ue 
                INNER JOIN login as l on (ue.id_usuario_empresa = l.id_usuario_empresa) 
                WHERE l.email = ? and l.contraseña = ?;`;

        connection.query(sql, params, (error,rs) =>   {
            if(!error)  {
                salida = {error:false, code:200, mensaje:rs};
                // console.log(rs[0].id_usuario_cliente);
                response.send(salida);

            }else   {
                salida = {error:true, code:200, mensaje:error};
                response.send(salida);
            }
        });
});

app.post('/empresa-registro', (request, response) =>   {
    let params1 = [request.body.nombre,request.body.telefono];
    let params3 = [0,request.body.email,request.body.contraseña]
    
    let sql1 = `INSERT INTO usuario_empresa (nombre_empresa,telefono) VALUES (?,?);`;
    let sql2 = `SELECT id_usuario_empresa FROM usuario_empresa WHERE nombre_empresa = ? AND telefono = ?;`
    let sql3 = `INSERT INTO login (id_usuario_cliente, id_usuario_empresa, email, contraseña) VALUES (null,?,?,?);`;

    connection.query(sql1, params1, (error1,rs) =>   {
        if(!error1)  {

            connection.query(sql2, params1, (error2,rs2) =>   {

                if(!error2)  {
                    params3[0] = rs2[0].id_usuario_empresa;

                    connection.query(sql3, params3, (error3,rs3) => {

                        if(!error3) {
                            salida = {error:false, code:200, mensaje:rs3};
                            response.send(salida);
                        }else   {
                            salida = {error:true, code:200, mensaje:error3};
                            response.send(salida);
                        }
                    });
                    
                }else   {
                    salida = {error:true, code:200, mensaje:error2};
                    response.send(salida);
                }
            });
        }else   {
            salida = {error:true, code:200, mensaje:error1};
            response.send(salida);
        }
    });
});

app.listen(3000);
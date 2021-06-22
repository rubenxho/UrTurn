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

app.get("/discos",
    function (request,response)
    {
        let id = request.query.id_disco;
        if(id){
            let params =[id]
            let sql= 'SELECT * FROM usuario_cliente'
            connection.query(sql,params, 
                function(err, res){
                    if(err){
                     console.log(err);
                     response.send({error: true, codigo: 200, mensaje: 'El disco no existe'})
                     }
                    else{
                     console.log(res)
                     response.send(res)
                    }
                }
            )
        }
        else{
            let params =null
            let sql= 'SELECT * FROM usuario_cliente '
            connection.query(sql,params, 
                function(err, res){
                    if(err){
                     console.log(err);
                     }
                    else{
                     console.log(res)
                     response.send(res)
                    }
                }
            )
        }            
    }
)

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
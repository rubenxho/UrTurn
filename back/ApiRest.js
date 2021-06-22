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

app.listen(3000)
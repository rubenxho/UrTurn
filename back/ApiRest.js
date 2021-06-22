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
    

app.listen(3000)
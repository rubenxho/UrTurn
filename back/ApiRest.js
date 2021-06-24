const express =require("express");
const app =  express();    
const cors = require('cors')
const mysql = require('mysql2'); 
const { request } = require("express");

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


/*************************************CRUD USER-EMPRESAS***********************************/ 


app.get("/userE",(request,response)=>{

    let sending;
    let id = request.query.id_usuario_empresa
    let params = [id];

    if(id){ 
        let sql = `SELECT userE.*  FROM urturn.usuario_empresa AS userE
        WHERE userE.id_usuario_empresa = ?;`       
        
        connection.query(sql, params, (err,res)=>{
            if(err){
                console.log(err)
                sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error getUserE'}
                response.send(sending)
            }else{
                console.log(res)
                sending=res
                response.send(sending)
            }
            
        })
    }else{

        let sql= `SELECT userE.* FROM urturn.usuario_empresa AS userE;`

        connection.query(sql, (err,res)=>{
            if(err){
                console.log(err)
                sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error getUserE'}
                response.send(sending)
            }else{
                console.log(res)
              sending=res
              response.send(sending)
            }
        })
    }
});

app.put("/userE",(request,response)=>{

	let sending;
	let id = request.body.id_usuario_empresa;
	let name = (request.body.nombre_empresa == "" ? null : request.body.nombre_empresa);
	let catg= (request.body.categoria == "" ? null : request.body.categoria);
	let tlf= (request.body.telefono == "" ? null : request.body.telefono);
	let cp= (request.body.codigo_postal == ""  ? null : request.body.codigo_postal);
	let address = (request.body.direccion == "" ? null : request.body.direccion);
	let img = (request.body.imagen_url == "" ? null : request.body.imagen_url);
	let desc = (request.body.descripcion == "" ? null : request.body.descripcion);
	let open = (request.body.apertura == "" ? null : request.body.apertura);
	let close= (request.body.cierre == "" ? null : request.body.cierre);
	let time = (request.body.tiempo_espera == "" ? null : request.body.tiempo_espera);
	let logo = (request.body.logo == "" ? null : request.body.logo);
    let status =(request.body.estado_turno == "" ? null : request.body.estado_turno);

	let params = [name,catg,tlf,cp,address,img,desc,open,close,time,logo,status, id];

	let sql='UPDATE urturn.usuario_empresa AS userE SET userE.nombre_empresa=COALESCE(?,userE.nombre_empresa), userE.categoria=COALESCE(?,userE.categoria), userE.telefono=COALESCE(?,userE.telefono), userE.codigo_postal=COALESCE(?,userE.codigo_postal), userE.direccion=COALESCE(?,userE.direccion), userE.imagen_url=COALESCE(?,userE.imagen_url), userE.descripcion=COALESCE(?,userE.descripcion), userE.apertura=COALESCE(?,userE.apertura), userE.cierre=COALESCE(?,userE.cierre), userE.tiempo_espera=COALESCE(?,userE.tiempo_espera), userE.logo=COALESCE(?,userE.logo), userE.estado_turno=COALESCE(?,userE.estado_turno) WHERE userE.id_usuario_empresa = ?'

    connection.query(sql, params, (err,res)=>{
        if(err){
            console.log(err)
            sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error putUserE'}
            response.send(sending)
        }else{
            console.log(res)
            sending=res  
            response.send(sending)
        }
    })

});


app.delete("/deleteUserE", (request, response)=>{
    
    let sending;
    let id = request.body.id_usuario_empresa

    if(id){

        let sql = `DELETE * FROM urturn.usuario_empresa AS userE WHERE userE.id_usuario_empresa = ?` 
        connection.query(sql, id, (err, res)=>{

            if(err){
                console.log({error: true, codigo: 200, mensaje: 'Ha ocurrido un error deleteUserE'})
            }else{
                sending = res;
            }

            response.send(sending);

        })

    }else{
        response.send({error: true, codigo: 200, mensaje: 'ERROR DELETE'})
    }
});

/******************************CRUD USER-CLIENTE*****************************************/ 

app.get("/userC",(request,response)=>{

    let sending;
    let id = request.query.id_usuario_cliente;
    let params = [id];

    if(id){
          
        let sql = 'SELECT userC.* FROM urturn.usuario_cliente AS userC WHERE userC.id_usuario_cliente = ?'        
        
        connection.query(sql, params, (err,res)=>{
            if(err){
                console.log(err)
                sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error getUserC'}
                response.send(sending)
            }else{
                console.log(res)
                sending=res
                response.send(sending)
            }
            
        })
    }else{

        let sql='SELECT * FROM urturn.usuario_cliente'
        connection.query(sql, (err,res)=>{
            if(err){
                console.log(err)
                sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error getUserC'}
                response.send(sending)
            }else{
                console.log(res)
              sending=res
              console.log("else")
              response.send(sending)
            }
        })
    }
});


app.put("/userC",(request,response)=>{

	let sending;
	let id = request.body.id_usuario_cliente;
	let name = (request.body.nombre_cliente == "" ? null : request.body.nombre_cliente);
	let lastName= (request.body.apellidos_cliente == "" ? null : request.body.apellidos_cliente);
	let tlf= (request.body.telefono == "" ? null : request.body.telefono);
	let img = (request.body.imagen_url == "" ? null : request.body.imagen_url);

	let params = [name,lastName, tlf, img, id];
    console.log("flag1")
    console.log(params)
	let sql='UPDATE urturn.usuario_cliente AS userC SET userC.nombre_cliente=COALESCE(?,userC.nombre_cliente), userC.apellidos_cliente=COALESCE(?,userC.apellidos_cliente), userC.telefono=COALESCE(?,userC.telefono), userC.imagen_url=COALESCE(?,userC.imagen_url) WHERE userC.id_usuario_cliente =?'
        console.log("flag2")
    connection.query(sql, params, (err,res)=>{
        if(err){
            console.log(err)
            sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error putUserC'}
            response.send(sending)
        }else{
            console.log(res)
            sending=res  
            response.send(sending)
        }
    })

});

app.delete("/deleteUserC", (request, response)=>{
    
    let sending;
    let id = request.body.id_usuario_cliente

    if(id){

        let sql = `DELETE * FROM urturn.usuario_cliente AS userC WHERE userC.id_usuario_cliente = ?` 
        connection.query(sql, id, (err, res)=>{

            if(err){
                console.log({error: true, codigo: 200, mensaje: 'Ha ocurrido un error deleteUserC'})
            }else{
                sending = res;
            }

            response.send(sending);

        })

    }else{
        response.send({error: true, codigo: 200, mensaje: 'ERROR DELETE'})
    }
});

app.listen(3000)
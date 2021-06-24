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




/* <----------------------------------------Endpoint Turnos/Cliente --------------------------------------->  */  
app.get("/turnos/cliente",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());

        let cliente=request.query.id_usuario_cliente;
        let params=[hoy,hoy,cliente,"Activo",hoy];
        let sql= "SELECT t.id_turno, t.id_usuario_empresa, e.nombre_empresa, TRUNCATE((TO_SECONDS(fecha_apertura_turno)-TO_SECONDS(?))/60,0) AS tiempo_espera FROM turnos AS t INNER JOIN usuario_empresa AS e ON (t.id_usuario_empresa=e.id_usuario_empresa) WHERE DAY(fecha_apertura_turno)= DAY(?) AND id_usuario_cliente= ? AND estado=? AND fecha_apertura_turno > ? "
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
)   


app.post("/turnos/cliente",
    function (request,response) 
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());
        let hora= hoy.getHours()
        let minute=hoy.getMinutes()
        let segundos=hoy.getSeconds()
        console.log(hoy)
        console.log(hora)
        console.log(minute)
        console.log(segundos)

        // Recibo como parametros id_cliente e id_empresa
        let cliente= request.body.id_usuario_cliente
        let empresa= request.body.id_usuario_empresa
        // let sql="SELECT tiempo_espera FROM usuario_empresa WHERE id_usuario_empresa=? AND estado_turno=?, AND apertura MAKETIME(?,?,?) "
        
        let params2=[hoy,empresa,"Activo"];
        let sql ="SELECT MAX(fecha_cierre_turno) AS ultima_fecha_cierre, e.tiempo_espera FROM turnos AS t INNER JOIN usuario_empresa AS e ON (t.id_usuario_empresa= e.id_usuario_empresa) WHERE Day(fecha_cierre_turno) = Day(?) AND t.id_usuario_empresa= ? AND estado=?";
        //let sql='SELECT id_turno,now(),MAX(fecha_cierre_turno),e.tiempo_espera, DATEDIFF(MAX(fecha_cierre_turno),CURRENT_TIME()) AS dia, TO_SECONDS(now())-TO_SECONDS(MAX(fecha_cierre_turno)) AS diferencia, MAX(fecha_cierre_turno) AS ultima_fecha FROM turnos AS t INNER JOIN usuario_empresa AS e ON (t.id_usuario_empresa= e.id_usuario_empresa) WHERE t.id_usuario_empresa= ? AND estado=? GROUP BY t.fecha_cierre_turno ORDER BY t.fecha_cierre_turno DESC LIMIT 1'
        connection.query(sql,params2,
            function(err, res){
                if(err){
                    console.log(err);
                    response.send({error: true, codigo: 200, mensaje: 'Error en select turnos'})
                }
                else{
                    console.log(res[0].ultima_fecha_cierre);
                    console.log(res[0].ultima_fecha_cierre < hoy)
                    console.log(res)
                    // declaro mis variables que usare en el insert
                    let f_solicitud=new Date(Date.now());
                    let f_apertura=new Date();
                    let f_cierre=new Date();
                    let t_espera="";
                    // CASO 1: Primer cliente del dia
                    if(res[0].ultima_fecha_cierre==null){
                        console.log("CASO 1: Primer cliente del dia")
                        let params3=[empresa];
                        let sql ="SELECT tiempo_espera FROM usuario_empresa WHERE id_usuario_empresa=?"
                        connection.query(sql,params3, 
                            function(err, res){
                                if(err){
                                 console.log(err);
                                 response.send({error: true, codigo: 200, mensaje: "Error en SELECT empresa"})
                                 }
                                else{
                                    t_espera=res[0].tiempo_espera;
                                    f_apertura=new Date(f_solicitud);
                                    f_cierre=new Date(f_apertura);
                                    f_cierre.setMinutes(f_cierre.getMinutes() + t_espera);
                                    // Inserto en la BD primer cliente 
                                    let params=[cliente,empresa,f_solicitud,f_apertura,f_cierre,"Activo"];
                                    let sql='INSERT INTO turnos (id_usuario_cliente,id_usuario_empresa,fecha_solicitud_turno,fecha_apertura_turno,fecha_cierre_turno,estado) VALUES(?,?,?,?,?,?)' 
                                    connection.query(sql,params, 
                                        function(err, res){
                                            if(err){
                                             console.log(err);
                                             response.send({error: true, codigo: 200, mensaje: "Error en INSERT turnos SELECT empresa"})
                                             }
                                            else{
                                             console.log(res)
                                             response.send({error: false, codigo: 200, mensaje: 'Turno agregado correctamente primera vez al dia'})
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                    else{
                        // CASO 2 mismo dia pero no hay nadie en fila
                        if(res[0].ultima_fecha_cierre <hoy){
                            console.log("CASO 2 mismo dia pero no hay nadie en fila")
                            f_apertura=new Date(f_solicitud);
                        }
                        // CASO 3 mismo hay fila
                        else{
                            console.log("CASO 3 mismo hay fila")
                            f_apertura=new Date(res[0].ultima_fecha_cierre)
                        }
                        t_espera=res[0].tiempo_espera;
                        console.log(t_espera)
                        f_cierre=new Date(f_apertura);
                        f_cierre.setMinutes(f_cierre.getMinutes() + t_espera);
                        // Inserto en la BD no hay nadie en fila o clientes en cola  
                        let param5=[cliente,empresa,f_solicitud,f_apertura,f_cierre,"Activo"];
                        let sql='INSERT INTO turnos (id_usuario_cliente,id_usuario_empresa,fecha_solicitud_turno,fecha_apertura_turno,fecha_cierre_turno,estado) VALUES(?,?,?,?,?,?)' 
                        connection.query(sql,param5, 
                            function(err, res){
                                if(err){
                                 console.log(err);
                                 response.send({error: true, codigo: 200, mensaje: "Error en INSERT turnos SELECT empresa"})
                                 }
                                else{
                                 console.log(res)
                                 response.send({error: false, codigo: 200, mensaje: 'Turno agregado correctamente con personas dentro de la fila'})
                                }
                            }
                        )
                    }
                }
            }   
        )
    }
)
/* <----------------------------------------FIN Turnos/Cliente --------------------------------------->  */ 

/* <----------------------------------------Endpoint Turnos/EMPRESA --------------------------------------->  */ 
app.get("/turnos/empresa/datos_generales",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());
        let empresa=request.query.id_usuario_empresa;
        let params=[empresa,"Activo",hoy]
        let sql='SELECT COUNT(*) AS numero_clientes FROM turnos WHERE id_usuario_empresa=? AND estado=? AND fecha_apertura_turno > ? ORDER BY fecha_apertura_turno ASC;'
        connection.query(sql,params, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error en SELECT count'})
                 }
                else{
                    console.log(res)
                    let numero_clientes=res[0].numero_clientes;
                    let params2=[empresa,"Activo",hoy]
                    let sql='SELECT id_turno, nombre_cliente, apellidos_cliente FROM turnos AS t  INNER JOIN usuario_cliente AS c ON (t.id_usuario_cliente=c.id_usuario_cliente) WHERE t.id_usuario_empresa=? AND estado=? AND fecha_apertura_turno > ? ORDER BY fecha_apertura_turno ASC LIMIT 1'
                    connection.query(sql,params2, 
                        function(err, res){
                            if(err){
                             console.log(err);
                             response.send({error: true, codigo: 200, mensaje: 'Error select proximo cliente'})
                             }
                            else{
                                console.log(res)
                                let id_turno=res[0].id_turno;
                                let proximo_cliente=res[0].nombre_cliente+" "+res[0].apellidos_cliente
                                let params3=[empresa,"Activo",hoy,hoy]
                                let sql='SELECT COUNT(*) AS clientes_atendidos FROM turnos WHERE id_usuario_empresa=? AND estado=? AND DAY(Fecha_cierre_turno)= DAY(?) AND fecha_cierre_turno < ?'
                                connection.query(sql,params3, 
                                       function(err, res){
                                           if(err){
                                            console.log(err);
                                            response.send({error: true, codigo: 200, mensaje: 'ERROR select clientes atendidos'})
                                            }
                                           else{
                                            console.log(res)
                                            let clientes_atendidos=res[0].clientes_atendidos;
                                            let respuesta={
                                                "numero_clientes_cola":numero_clientes,
                                                "numero_ticket":id_turno,
                                                "proximo_cliente":proximo_cliente,
                                                "clientes_atendidos":clientes_atendidos
                                            }
                                            response.send(respuesta)
                                           }
                                       }
                                   )   
                            }
                        }
                    )   
                }
            }
        )
    }
)   
/* <----------------------------------------FIN Turnos/EMPRESA --------------------------------------->  */ 

/* <----------------------------------------Endpoint Turnos/empresa/cola --------------------------------------->  */ 
app.get("/turnos/empresa/datos_clientes",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());

        let empresa=request.query.id_usuario_empresa;
        let params=[empresa,"Activo",hoy];
        let sql= "SELECT nombre_cliente, apellidos_cliente, telefono, imagen_url FROM turnos AS t  INNER JOIN usuario_cliente AS c ON (t.id_usuario_cliente=c.id_usuario_cliente) WHERE t.id_usuario_empresa=? AND estado=? AND fecha_apertura_turno> ? ORDER BY fecha_apertura_turno ASC "
        connection.query(sql,params, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error select usuarios en cola'})
                 }
                else{
                 console.log(res)
                 response.send(res)
                }
            }
        )
    }
)   
/* <----------------------------------------FIN Turnos/empresa/cola --------------------------------------->  */

/* <----------------------------------------Endpoint Turnos/EMPRESA/AvanzarCola --------------------------------------->  */ 
app.put("/turnos/empresa/avanzar_cola",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());
        let fecha_actual_espera= new Date();
        let empresa=request.body.id_usuario_empresa;
        let params=[empresa];
        let sql ="SELECT tiempo_espera FROM usuario_empresa WHERE id_usuario_empresa=?"
        connection.query(sql,params, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error select tiempo_espera'})
                }
                else{
                    console.log(res)
                    let tiempo_espera=res[0].tiempo_espera;
                    fecha_actual_espera=new Date(hoy);
                    fecha_actual_espera.setMinutes(fecha_actual_espera.getMinutes() + tiempo_espera);
                    let params2 =[empresa,"Activo",hoy,hoy,fecha_actual_espera]
                    let sql= `SELECT id_usuario_cliente FROM turnos  WHERE id_usuario_empresa = ? AND estado=? AND DAY(fecha_apertura_turno)=DAY(?) AND fecha_apertura_turno>? AND fecha_apertura_turno<?`   
                    //  let sql= `UPDATE turnos SET estado="Cancelado" WHERE id_usuario_empresa = ? AND estado=? AND DAY(fecha_apertura_turno)=DAY(?) AND fecha_apertura_turno>? AND fecha_apertura_turno<?`
                    connection.query(sql,params2, 
                        function(err, res){
                            if(err){
                            console.log(err);
                            response.send({error: true, codigo: 200, mensaje: 'Error select usuario strike'})
                            }
                            else{
                                console.log(res)
                                let cliente_strike=res[0].id_usuario_cliente;
                                let params3 =[empresa,"Activo",hoy,hoy,fecha_actual_espera,cliente_strike]
                                let sql= `UPDATE turnos SET estado="Cancelado" WHERE id_usuario_empresa = ? AND estado=? AND DAY(fecha_apertura_turno)=DAY(?) AND fecha_apertura_turno>? AND fecha_apertura_turno<? AND id_usuario_cliente`   
                                connection.query(sql,params3, 
                                    function(err, res){
                                        if(err){
                                        console.log(err);
                                        response.send({error: true, codigo: 200, mensaje: 'Error update avanzar cola'})
                                        }
                                        else{
                                            console.log(res)
                                            let params4 =[cliente_strike,empresa,hoy]
                                            let sql= `INSERT INTO puntuacion (id_usuario_cliente,id_usuario_empresa,date) VALUES(?,?,?)`
                                            connection.query(sql,params4, 
                                                function(err, res){
                                                    if(err){
                                                        console.log(err);
                                                        response.send({error: true, codigo: 200, mensaje: 'Error select usuarios en cola'})
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
                            }
                        }
                    )   
                }
            }
        )
    }
) 
/* <----------------------------------------FIN Turnos/EMPRESA/AvanzarCola --------------------------------------->  */

app.listen(3000)
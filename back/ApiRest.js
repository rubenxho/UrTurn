const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const { request, response } = require("express");
const crypto = require('crypto-js');
const nodemailer = require('nodemailer');

//Transporter para nodemailer
const transporter = nodemailer.createTransport({
  service:'Gmail',
  auth: {
    user:'urturnapplication@gmail.com',
    pass:'nodemailer'
  }
})

//Creo un servidor
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Uso cors
app.use(cors());

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

let salida = "";
let key = crypto.enc.Hex.parse("0123456789012345");
let ive  = crypto.enc.Hex.parse("0123456789012345");

app.get("/favoritos",
    function(request, response){
        let categoria = request.query.categoria
        let cp = request.query.cp
        let id = request.query.id
        let params = []
        let sql=``

        if(cp==null && categoria==null ){
            params = [id]
            sql=`SELECT e.id_usuario_empresa, e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE f.id_usuario_cliente=?`

        }
        else if(cp==null){
            params = [categoria, id]
            sql = `SELECT e.id_usuario_empresa, e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE e.categoria=? AND f.id_usuario_cliente=?`
        }
        else if(categoria==null){
            params = [cp, id]
            sql = `SELECT e.id_usuario_empresa, e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE codigo_postal=? AND f.id_usuario_cliente=?`
        }
        else {
            params4 = [categoria, cp, id]
            sql = `SELECT e.id_usuario_empresa, e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE e.categoria=? AND codigo_postal=? AND f.id_usuario_cliente=?`
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
    }
)


/* <----------------------------------------Endpoint Turnos/Cliente --------------------------------------->  */  
app.get("/turnos/cliente",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());

        let cliente=request.query.id_usuario_cliente;
        let params=[hoy,hoy,cliente,"Activo",hoy];
        let sql= "SELECT t.id_turno, t.id_usuario_empresa, e.nombre_empresa,e.logo, TRUNCATE((TO_SECONDS(fecha_apertura_turno)-TO_SECONDS(?))/60,0) AS tiempo_espera FROM turnos AS t INNER JOIN usuario_empresa AS e ON (t.id_usuario_empresa=e.id_usuario_empresa) WHERE DAY(fecha_apertura_turno)= DAY(?) AND id_usuario_cliente= ? AND estado=? AND fecha_apertura_turno > ?  ORDER BY tiempo_espera ASC"
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

        // Recibo como parametros id_cliente e id_empresa
        let cliente= request.body.id_usuario_cliente
        let empresa= request.body.id_usuario_empresa
        // Varibales que voy a evaluar y usar en el insert
        let t_espera;
        let f_solicitud=new Date(Date.now());
        let f_apertura=new Date();
        let f_cierre=new Date();
        let params7=[cliente,empresa,hoy,hoy,"Activo"]
        // Verifico que el cliente ya no este en cola en este local
        let sql= 'SELECT * FROM turnos WHERE id_usuario_cliente=? AND id_usuario_empresa=? AND fecha_cierre_turno > ? AND DAY(fecha_cierre_turno)= DAY(?) AND estado=?'
        connection.query(sql,params7, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error verifico cliente en cola'})
                 }
                else{
                  console.log(res)
                  // Caso ya el cliente tiene un turno en este local
                  if(res.length!=0){
                    let respuesta=[{
                      "id_turno":0
                    }]
                    response.send(respuesta)
                  }
                  // El cliente puede hacer la cola
                  else{
                    let params=[hoy,hoy,empresa,"Turno Activo"]
                    // VERIFICO QUE EL LOCAL ESTE ABIERTO(HORARIO APUERTURA-CIERRE) Y QUE SU TURNO ESTE TURNO_ACTIVO
                    let sql='SELECT * FROM usuario_empresa WHERE apertura<date_format(?, "%H:%i:%s")  AND cierre>date_format(?, "%H:%i:%s") AND id_usuario_empresa= ? AND estado_turno=?'
                    connection.query(sql,params, 
                      function(err, res){
                          if(err){
                           console.log(err);
                           }
                          else{
                            console.log(res)
                            // Caso que no se pueda hacer turno en el local
                            if(res.length==0){
                              let respuesta=[{
                                "id_turno":1
                              }]
                              response.send(respuesta) 
                            }
                            // Caso que se pueda hacer turno
                            else{
                              console.log(res[0].tiempo_espera)
                              t_espera=res[0].tiempo_espera;
                              let params2=[hoy,empresa,"Activo"];
                              let sql ="SELECT MAX(fecha_cierre_turno) AS ultima_fecha_cierre, e.tiempo_espera FROM turnos AS t INNER JOIN usuario_empresa AS e ON (t.id_usuario_empresa= e.id_usuario_empresa) WHERE Day(fecha_cierre_turno) = Day(?) AND t.id_usuario_empresa= ? AND estado=?";
                              connection.query(sql,params2, 
                                function(err, res){
                                    if(err){
                                     console.log(err);
                                     response.send({error: true, codigo: 200, mensaje: 'Error en select turnos'})
                                     }
                                    else{
                                      console.log(res)
                                      // CASO 1: Primer cliente del dia
                                      if(res[0].ultima_fecha_cierre==null){
                                        f_apertura=new Date(f_solicitud);
                                        f_cierre=new Date(f_apertura);
                                        f_cierre.setMinutes(f_cierre.getMinutes() + t_espera);
                                        // Inserto en la BD primer cliente 
                                        let params3=[cliente,empresa,f_solicitud,f_apertura,f_cierre,"Activo"];
                                        let sql='INSERT INTO turnos (id_usuario_cliente,id_usuario_empresa,fecha_solicitud_turno,fecha_apertura_turno,fecha_cierre_turno,estado) VALUES(?,?,?,?,?,?)' 
                                        connection.query(sql,params3, 
                                            function(err, res){
                                                if(err){
                                                 console.log(err);
                                                 response.send({error: true, codigo: 200, mensaje: "Error en INSERT turnos SELECT empresa"})
                                                 }
                                                else{
                                                  console.log(res)
                                                  let params5=["Activo",hoy];
                                                  let sql='SELECT MAX(id_turno) AS id_turno FROM turnos WHERE estado=? AND Day(fecha_solicitud_turno) = Day(?)' 
                                                  connection.query(sql,params5, 
                                                      function(err, res){
                                                          if(err){
                                                           console.log(err);
                                                           response.send({error: true, codigo: 200, mensaje: "Error SELECT id_turno"})
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
                                      // CASO 2: Ya tengo clientes en fila
                                      else{
                                        // CASO 2.1: mismo dia pero no hay nadie en fila
                                        if(res[0].ultima_fecha_cierre <hoy){
                                            console.log("CASO 2 mismo dia pero no hay nadie en fila")
                                            f_apertura=new Date(f_solicitud);
                                        }
                                        // CASO 2.2: mismo dia hay persona en fila
                                        else{
                                            console.log("CASO 3 mismo hay fila")
                                            f_apertura=new Date(res[0].ultima_fecha_cierre)
                                        }
                                        console.log(t_espera)
                                        f_cierre=new Date(f_apertura);
                                        f_cierre.setMinutes(f_cierre.getMinutes() + t_espera);
                                        // Inserto en la BD no hay nadie en fila o clientes en cola  
                                        let param4=[cliente,empresa,f_solicitud,f_apertura,f_cierre,"Activo"];
                                        let sql='INSERT INTO turnos (id_usuario_cliente,id_usuario_empresa,fecha_solicitud_turno,fecha_apertura_turno,fecha_cierre_turno,estado) VALUES(?,?,?,?,?,?)' 
                                        connection.query(sql,param4, 
                                            function(err, res){
                                                if(err){
                                                 console.log(err);
                                                 response.send({error: true, codigo: 200, mensaje: "Error en INSERT turnos SELECT empresa"})
                                                 }
                                                else{
                                                  console.log(res)
                                                  let params6=["Activo",hoy];
                                                  let sql='SELECT MAX(id_turno) AS id_turno FROM turnos WHERE estado=? AND Day(fecha_solicitud_turno) = Day(?)' 
                                                  connection.query(sql,params6, 
                                                      function(err, res){
                                                          if(err){
                                                           console.log(err);
                                                           response.send({error: true, codigo: 200, mensaje: "Error SELECT id_turno 2"})
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
                                }
                              )
                            }
                          }
                      }
                    )
                  }
                  
                }
            }
        )


                                                
    }
)

app.post("/turnos/cliente2",
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

app.put("/turnos/cliente",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());

        let cliente=request.body.id_turno;
        let params=["Cancelado",cliente,"Activo"];
        let sql= "UPDATE turnos SET estado=? WHERE id_turno=? AND estado=?"
        connection.query(sql,params, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error en el update cancelar turno'})
                 }
                else{
                 console.log(res)
                 response.send(res)
                }
            }
        )
    }
)   

/* <----------------------------------------FIN Turnos/Cliente --------------------------------------->  */ 

/* <----------------------------------------Endpoint Turnos/EMPRESA --------------------------------------->  */ 
// ENDPOINT DONDE DEVUELVO JSON CON LOS DATOS A MOSTRAR EN HOME/EMPRESA
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
                    console.log(res[0].numero_clientes) 
                    // CASO DONDE TENGO PERSONAS EN COLA
                    if(res[0].numero_clientes!=0){     
                                    console.log("respuesta numero clientes")
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
                                                let sql='SELECT COUNT(*) AS clientes_atendidos FROM turnos WHERE id_usuario_empresa=? AND estado=? AND DAY(fecha_cierre_turno)= DAY(?) AND fecha_cierre_turno < ?'
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
                    //CASO EN DONDE NO TENGO NINGUN CLIENTE EN COLA 
                    else{
                        console.log(res)
                        let id_turno=res[0].id_turno;
                        let proximo_cliente=res[0].nombre_cliente+" "+res[0].apellidos_cliente
                        let params3=[empresa,"Activo",hoy,hoy]
                        let sql='SELECT COUNT(*) AS clientes_atendidos FROM turnos WHERE id_usuario_empresa=? AND estado=? AND DAY(fecha_cierre_turno)= DAY(?) AND fecha_cierre_turno < ?'
                        connection.query(sql,params3, 
                               function(err, res){
                                   if(err){
                                    console.log(err);
                                    response.send({error: true, codigo: 200, mensaje: 'ERROR else select clientes atendidos'})
                                    }
                                   else{
                                    console.log("clientes atendidos")   
                                    console.log(res)
                                    let clientes_atendidos=res[0].clientes_atendidos;
                                    let respuesta={
                                        "numero_clientes_cola":0,
                                        "numero_ticket":0,
                                        "proximo_cliente":"Sin Clientes",
                                        "clientes_atendidos":clientes_atendidos
                                    }
                                    response.send(respuesta)
                                   }
                               }
                        ) 
                    }                              
                }
            }
        )
    }
)   

/* <----------------------------------------FIN Turnos/EMPRESA --------------------------------------->  */ 

/* <----------------------------------------Endpoint Turnos/empresa/cola --------------------------------------->  */ 
// Me retorna un array con clientes en cola
app.get("/turnos/empresa/datos_clientes",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());

        let empresa=request.query.id_usuario_empresa;
        let params=[empresa,"Activo",hoy];
        let sql= "SELECT t.id_turno,t.id_usuario_cliente,nombre_cliente, apellidos_cliente, telefono, imagen_url FROM turnos AS t  INNER JOIN usuario_cliente AS c ON (t.id_usuario_cliente=c.id_usuario_cliente) WHERE t.id_usuario_empresa=? AND estado=? AND fecha_apertura_turno> ? ORDER BY fecha_apertura_turno ASC "
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
// Endpoint para avanzar cola (cambio estado del primer cliente a CANCELADO y luego lo apunto en la tabla strike)
app.put("/turnos/empresa/avanzar_cola",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());
        let fecha_actual_espera= new Date();
        let empresa=request.body.id_usuario_empresa;
        console.log(request.body.id_usuario_empresa)
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

/* <----------------------------------------Endpoint puntuacion --------------------------------------->  */ 
// EndPoint donde recibo un usuario y calculo su "fama", retorna un string con el color de su fama 
app.get("/strike",
    function(request,response)
    {
        // FECHA ACTUAL
        let hoy = new Date(Date.now());
        let karma=" ";
        let cliente=request.query.id_usuario_cliente;
        let params=[cliente,hoy,cliente,"Activo"];
        let sql= "SELECT COUNT(*) AS locales_visitados FROM turnos WHERE id_usuario_cliente=? AND fecha_cierre_turno < ? AND estado=?"
        connection.query(sql,params, 
            function(err, res){
                if(err){
                 console.log(err);
                 response.send({error: true, codigo: 200, mensaje: 'Error select todos los turnos'})
                 }
                else{
                    console.log(res)
                    let locales_visitados= res[0].locales_visitados;
                    let params2=[cliente];
                    let sql= "SELECT COUNT(*) AS numero_strike FROM puntuacion WHERE id_usuario_cliente=?;"
                    connection.query(sql,params2, 
                      function(err, res){
                          if(err){
                           console.log(err);
                           response.send({error: true, codigo: 200, mensaje: 'Error select contar strike'})
                           }
                          else{
                           console.log(res)
                           let numero_strike=res[0].numero_strike
                            
                            if(locales_visitados==0){
                                if(numero_strike>=3){
                                  karma="red"
                                  console.log("red 0")
                                }
                                else if(numero_strike>=2){
                                  karma="yellow"
                                  console.log("yellow 0")
                                }
                                else{
                                  karma="green"
                                  console.log("green 0")
                                }
                            }
                            else if(locales_visitados*0.3<=numero_strike){
                              karma="red"
                              console.log("red")
                            }
                            else if(locales_visitados*0.2<=numero_strike){
                              karma="yellow"
                              console.log("yellow")
                            }
                            else{
                              karma="green"
                              console.log("green")
                            }
                            // retorna un string con el color de su fama
                            let respuesta={
                              "karma":karma
                            }
                            response.send(respuesta)
                          }
                      }
                    )
                }
            }
        )
    }
)   
/* <----------------------------------------FIN puntuacion --------------------------------------->  */


app.post("/favoritos",
    function(request, response){
        id_usuario_cliente = request.body.id_usuario_cliente
        id_usuario_empresa = request.body.id_usuario_empresa
        fecha= new date(Date.now())
        params = [ id_usuario_cliente, id_usuario_empresa, fecha]
        sql = `INSERT INTO urturn.favoritos ( id_usuario_cliente, id_usuario_empresa, fecha)
        VALUES (?,?,?)`
        
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
});

/*************************************CRUD USER-EMPRESAS***********************************/ 


app.get("/userE",(request,response)=>{

    let sending;
    let id = request.query.id
    let params = [id];

    //seeders ayudan en esto


    if(id>0){ 
        let sql = `SELECT userE.*  FROM urturn.usuario_empresa AS userE
        WHERE userE.id_usuario_empresa = ?;`  
        console.log(sql)     
        
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
    }else if(!id){

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
    }else{
      response.send({error: true, codigo: 204, mensaje: 'UNFOUND'})
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
  console.log(params)
	let sql=`UPDATE urturn.usuario_empresa AS userE SET userE.nombre_empresa=COALESCE(?,userE.nombre_empresa), userE.categoria=COALESCE(?,userE.categoria), userE.telefono=COALESCE(?,userE.telefono), 
  userE.codigo_postal=COALESCE(?,userE.codigo_postal), userE.direccion=COALESCE(?,userE.direccion), userE.imagen_url=COALESCE(?,userE.imagen_url), userE.descripcion=COALESCE(?,userE.descripcion), 
  userE.apertura=COALESCE(?,userE.apertura), userE.cierre=COALESCE(?,userE.cierre), userE.tiempo_espera=COALESCE(?,userE.tiempo_espera), userE.logo=COALESCE(?,userE.logo), 
  userE.estado_turno=COALESCE(?,userE.estado_turno) WHERE userE.id_usuario_empresa = ?`

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

app.put("/userEP",(request,response)=>{
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
  let password = (request.body.password == "" ? null: request.body.password);
  
  let params = [name,catg,tlf,cp,address,img,desc,open,close,time,logo,status, password,id]
  console.log("body",request.body)
  console.log(password)
  let  sql=`UPDATE urturn.usuario_empresa AS userE JOIN urturn.login AS lg ON lg.id_usuario_empresa = userE.id_usuario_empresa
  SET userE.nombre_empresa=COALESCE(?,userE.nombre_empresa), userE.categoria=COALESCE(?,userE.categoria), userE.telefono=COALESCE(?,userE.telefono), 
  userE.codigo_postal=COALESCE(?,userE.codigo_postal), userE.direccion=COALESCE(?,userE.direccion), userE.imagen_url=COALESCE(?,userE.imagen_url), userE.descripcion=COALESCE(?,userE.descripcion), 
  userE.apertura=COALESCE(?,userE.apertura), userE.cierre=COALESCE(?,userE.cierre), userE.tiempo_espera=COALESCE(?,userE.tiempo_espera), userE.logo=COALESCE(?,userE.logo), 
  userE.estado_turno=COALESCE(?,userE.estado_turno), lg.contraseña=COALESCE(?,lg.contraseña) WHERE userE.id_usuario_empresa = ?`
  
  console.log(sql)
    connection.query(sql, params, (err,res)=>{
        if(err){
            console.log(params)
            console.log(err)
            sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error putUserEP'}
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
/******************************END CRUD USER-EMPRESA*****************************************/ 
/******************************CRUD USER-CLIENTE*****************************************/ 

app.get("/userC",(request,response)=>{

    let sending;
    let id = request.query.id;
    let params = [id];

    if(id>0){
          
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
    }else if(!id){

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
    }else{
      response.send({error: true, codigo: 204, mensaje: 'UNFOUND'})
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
    // console.log(params)
	let sql='UPDATE urturn.usuario_cliente AS userC SET userC.nombre_cliente=COALESCE(?,userC.nombre_cliente), userC.apellidos_cliente=COALESCE(?,userC.apellidos_cliente), userC.telefono=COALESCE(?,userC.telefono), userC.imagen_url=COALESCE(?,userC.imagen_url) WHERE userC.id_usuario_cliente =?'  
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

app.put("/userCP",(request,response)=>{

  let nombre_cliente = request.body.nombre_cliente;
  let apellidos_cliente = request.body.apellidos_cliente;
  let telefono = request.body.telefono;
  let imagen_url = request.body.imagen_url;
  let password = request.body.password;
  let id_usuario_cliente = request.body.id_usuario_cliente;

  let  sql=`UPDATE urturn.usuario_cliente AS clnt
  JOIN urturn.login AS lg ON lg.id_usuario_cliente = clnt.id_usuario_cliente SET clnt.nombre_cliente=COALESCE("${nombre_cliente}",clnt.nombre_cliente),
  clnt.apellidos_cliente=COALESCE("${apellidos_cliente}",clnt.apellidos_cliente), clnt.telefono=COALESCE("${telefono}",clnt.telefono), 
  clnt.imagen_url=COALESCE("${imagen_url}",clnt.imagen_url), lg.contraseña=COALESCE("${password}",lg.contraseña) WHERE clnt.id_usuario_cliente = "${id_usuario_cliente}"`
  
  console.log(sql)
    connection.query(sql, (err,res)=>{
        if(err){
            console.log(err)
            sending={error: true, codigo: 200, mensaje: 'Ha ocurrido un error putUserCP'}
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
/***************************************END CRUD USER-CLIENTE*************************************************/
/****************************************************************************************************/

app.delete("/favoritos",
    function(request,response){
        params=[request.body.id_favoritos]
        sql=`DELETE  FROM urturn.favoritos WHERE (id_favoritos=?)`

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

app.post("/puntuacion", (req, res) => {
  console.log(req.body);
  let params = [
    req.body.id_usuario_cliente,
    req.body.id_usuario_empresa,
    req.body.date,
  ];
  connection.query(
    `INSERT INTO puntuacion (id_usuario_cliente, id_usuario_empresa, date)
                        VALUES (?,?,?)`,

    params,

    (err, newPuntuacion) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(newPuntuacion);
        res.send({
          error: false,
          codigo: 200,
          mensaje: "Añadida nueva puntuación",
        });
      }
    }
  );
});

/*********************************************************************************************************/
/********************************ENDPOINT LOCALES*********************************************************/
app.get("/local",
    function(request, response){
        let categoria = request.query.categoria
        let cp = request.query.cp
        let id = request.query.id
        let params = []
        let sql=``

        if(cp==null && categoria==null ){
            params = [id]
            sql=`SELECT userE.nombre_empresa, userE.imagen_url, AVG(nota) AS valoracion FROM usuario_empresa AS userE 
            LEFT JOIN opiniones AS op ON userE.id_usuario_empresa = op.id_usuario_empresa
            WHERE op.nota <> "null"
            GROUP BY userE.id_usuario_empresa ORDER BY valoracion DESC LIMIT 5`

        }
        else if(cp==null){
            params = [categoria]
            sql = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
            JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
            WHERE categoria =? GROUP BY e.id_usuario_empresa`
        }
        else if(categoria==null){
            params = [cp]
            console.log(cp)
            sql = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
            JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
            WHERE codigo_postal =? GROUP BY e.id_usuario_empresa`
        }
        else {
            params = [categoria, cp]
            sql = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
            JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
            WHERE e.categoria =? AND e.codigo_postal =? GROUP BY e.id_usuario_empresa`
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
    }
)




// app.get("/local", (req, res) => {
//   let sqlByID = `SELECT e.id_usuario_empresa, nombre_empresa, categoria, direccion, tiempo_espera, descripcion, apertura, cierre, imagen_url, estado_turno, AVG(nota) AS nota_media
//                   FROM urturn.usuario_empresa AS e INNER JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa)
//                   WHERE e.id_usuario_empresa = ?`;
//   let sqlCp = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
//                   JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
//                   WHERE (codigo_postal =COALESCE(?,codigo_postal)) GROUP BY e.id_usuario_empresa`;
//   let sqlCatg = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
//                   JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
//                   WHERE (categoria =COALESCE(?,categoria) OR codigo_postal =COALESCE(?,codigo_postal)) GROUP BY e.id_usuario_empresa`'
  
//                   let sqlBoth = `SELECT e.*, AVG(nota) AS nota_media FROM  urturn.usuario_empresa AS e 
//   JOIN urturn.opiniones AS o ON (e.id_usuario_empresa=o.id_usuario_empresa) 
//   WHERE (categoria = ? AND codigo_postal = ?) GROUP BY e.id_usuario_empresa`;
                  
                 
//   let sqlTop = `SELECT userE.nombre_empresa, userE.imagen_url, AVG(nota) AS valoracion FROM usuario_empresa AS userE 
//                 LEFT JOIN opiniones AS op ON userE.id_usuario_empresa = op.id_usuario_empresa
//                 WHERE op.nota <> "null"
//                 GROUP BY userE.id_usuario_empresa ORDER BY valoracion DESC LIMIT 5`;
//   let id = req.query.id;
//   let busqueda = [req.query.categoria, req.query.codigo_postal];
//   let top = "";


//   if (busqueda[0]==null && busqueda[1]==null) {
//     connection.query(sqlByID, [id, id], (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else{
//         res.json(result);
//       } 
//     });
//   } else if (busqueda[0]!=undefined) {
//     console.log(busqueda)
//     connection.query(sqlAll, busqueda, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else{
//         res.json(result);
//       } 
//     });

//   }else if (busqueda[1]!=undefined) {
//     connection.query(sqlAll, busqueda, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else{
//         res.json(result);
//       } 
//     });

//   }else if (busqueda[0]!=undefined && busqueda[1]!=undefined) {
//     console.log(busqueda)
//     connection.query(sqlBoth, busqueda, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.send(err);
//       } else{
//         res.json(result);
//       } 
//     });
    
//   }else{
//     connection.query(sqlTop, top, (err, result) => {

//       if (err) {

//         console.log(err);
//         res.send(err);

//       } else{

//         // console.log(result)
//         res.json(result);
        
//       }
//     });

//   }
  
// });

/************************************************************************************/

app.get("/login", (request, response) => {

  let contra = crypto.AES.encrypt(request.query.contraseña, key, {iv: ive}).toString();
  console.log(contra);
  console.log(`select id_usuario_cliente, id_usuario_empresa from login where email=${request.query.email} and contraseña=${contra};`);

  let params = [
    request.query.email,
    // request.query.contraseña,
    contra
  ];

  
  let sql = `select id_usuario_cliente, id_usuario_empresa from login where email=? and contraseña=?;`

  connection.query(sql, params, (error, rs) => {
    if (!error) {
      salida = { error: false, code: 200, mensaje: rs };
      response.send(salida);
    } else {
      salida = { error: true, code: 200, mensaje: error };
      response.send(salida);
    }
  });
});

app.post("/empresa-registro", (request, response) => {

  encPassword = crypto.AES.encrypt(request.body.password, key, {iv: ive}).toString();

  let mailOptions = {
    from: 'UrTurn',
    to: request.body.email,
    subject:'Bienvenido a UrTurn!',
    text: `Hola, ${request.body.email} \nYa puedes gestionar los turnos de tus clientes de la forma más fácil!`
  };

  let params1 = [request.body.nombre_empresa, request.body.telefono];
  let params3 = [0, request.body.email, encPassword];

  let sql1 = `INSERT INTO usuario_empresa (nombre_empresa,telefono,estado_turno) VALUES (?,?,'Turno Activo');`;
  let sql2 = `SELECT id_usuario_empresa FROM usuario_empresa WHERE nombre_empresa = ? AND telefono = ?;`;
  let sql3 = `INSERT INTO login (id_usuario_empresa, email, contraseña) VALUES (?,?,?);`;

  connection.query(sql1, params1, (error1, rs) => {
    if (!error1) {
      connection.query(sql2, params1, (error2, rs2) => {
        if (!error2) {
          params3[0] = rs2[0].id_usuario_empresa;

          connection.query(sql3, params3, (error3, rs3) => {
            if (!error3) {

              transporter.sendMail(mailOptions, (error4, rs4) =>  {
                if(!error4) {
                  console.log(`Email enviado a ${request.body.email}`);
                  salida = { error: false, code: 200, mensaje: rs3, rs4 };
                  response.send(salida);
                }else {
                  salida = { error: true, code: 200, mensaje: error4 };
                  response.send(salida);
                }
              })
            } else {
              salida = { error: true, code: 200, mensaje: error3 };
              response.send(salida);
            }
          });
        } else {
          salida = { error: true, code: 200, mensaje: error2 };
          response.send(salida);
        }
      });
    } else {
      salida = { error: true, code: 200, mensaje: error1 };
      response.send(salida);
    }
  });
});

/********************************************ENDPOINT CLIENTEOPINIONES******************************************************/
app.get("/opiniones", (req, res) => {
  let paramsEmpresa = [req.query.id_usuario_empresa];
  const sqlCliente = `  
  SELECT op.id_opiniones, userC.id_usuario_cliente ,userC.nombre_cliente, userC.imagen_url, op.nota, op.opinion, DATE_FORMAT(fecha,'%Y-%m-%d') fecha 
  FROM urturn.opiniones AS op
  JOIN urturn.usuario_cliente AS userC 
  ON op.id_usuario_cliente = userC.id_usuario_cliente
  JOIN urturn.usuario_empresa AS userE 
  ON userE.id_usuario_empresa = op.id_usuario_empresa 
  WHERE userE.id_usuario_empresa = ?
  ORDER BY op.fecha DESC;`;


  let paramsCliente = [req.query.id_usuario_cliente];
  const sqlEmpresa = `
  SELECT op.id_opiniones, userE.id_usuario_empresa ,userE.nombre_empresa, userE.imagen_url, op.nota, op.opinion, DATE_FORMAT(fecha,'%Y-%m-%d') fecha 
  FROM urturn.opiniones AS op
  JOIN urturn.usuario_empresa AS userE 
  ON op.id_usuario_empresa = userE.id_usuario_empresa
  JOIN urturn.usuario_cliente AS userC 
  ON op.id_usuario_cliente = userC.id_usuario_cliente
  WHERE userC.id_usuario_cliente = ?
  ORDER BY op.fecha DESC;`;

  if (paramsEmpresa[0] != undefined && paramsCliente[0] == undefined) {
    connection.query(sqlCliente, paramsEmpresa, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        res.status(200).send(dbres);
      }
    });
  } else if (paramsCliente[0] != undefined && paramsEmpresa[0] == undefined) {
    connection.query(sqlEmpresa, paramsCliente, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        res.status(200).send(dbres);
      }
    });
  }    
});

app.get("/opiniones/empresa_visitada",(req,res)=>{
  let id=req.query.id_usuario_cliente
  let params = [id, id,id];
  const sqlAll = `
  SELECT
    DISTINCT(t.id_usuario_empresa ),
    t.fecha_cierre_turno,
    now(),
    ue.*
  FROM turnos as t 
  INNER JOIN usuario_empresa AS ue 
  ON t.id_usuario_empresa = ue.id_usuario_empresa 
  WHERE 
  t.id_usuario_cliente = ?
  AND t.fecha_cierre_turno < NOW()
  AND LOWER(t.estado) = "activo"
  AND t.id_usuario_empresa not in (
    select o.id_usuario_empresa from opiniones o where o.id_usuario_cliente = ?
  )
  AND t.id_usuario_empresa not in (
	  select o.id_usuario_empresa from opiniones_rechazadas as o where o.id_usuario_cliente = ?
  )
  ORDER BY t.fecha_cierre_turno DESC
  ;
  `;
  connection.query(sqlAll, params, (err, dbres) => {
    if (err) {
      res.status(400).send({ error: true });
    } else {
      console.log(dbres);
      res.status(200).send(dbres);
    }
  }); 
})

app.post("/opiniones_rechazadas", (req, res) => {
  let { id_cliente, id_empresa } = req.body;
  let params = [id_cliente, id_empresa];
  const sql = ` INSERT INTO opiniones_rechazadas VALUES (0, ?, ?);`
  connection.query(sql, params, (err, dbres) => {
    if (err) {

      console.log(err);
      res.status(400).send({ error: true });
    } else {
      console.log(dbres);
      res.status(201).send(dbres);
    }
  });
});

app.post("/opiniones", (req, res) => {
  const params = [
    req.body.id_usuario_cliente,
    req.body.id_usuario_empresa,
    req.body.nota,
    req.body.opinion,
    req.body.fecha,
  ];
  const sql = `
  INSERT INTO opiniones (id_usuario_cliente, id_usuario_empresa, nota, opinion, fecha) VALUES (?,?,?,?,CURDATE())
  `;
  connection.query(sql, params, (err, dbres) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: true });
    } else {
      console.log(dbres);
      res.status(201).send(dbres);
    }
  });
});

/*********Las peticiones de "PUT", "DETELE" aún no necesitan, lo guaodo ahora por si acaso, al final lo borraré ************/
app.put("/opiniones", (req, res) => {
  const params = [
    req.body.id_usuario_cliente,
    req.body.id_usuario_empresa,
    req.body.nota,
    req.body.opinion,
    req.body.fecha,
    req.body.id_opiniones,
  ];
  const sql = `
  UPDATE 
    opiniones AS op 
  SET  
    op.id_usuario_cliente = COALESCE(?, op.id_usuario_cliente),
    op.id_usuario_empresa = COALESCE (?,op.id_usuario_empresa),
    op.nota = COALESCE(?, op.nota),
    op.opinion =COALESCE(?, op.opinion),
    op.fecha =COALESCE(?, op.fecha)
  WHERE op.id_opiniones = ?
  ;`;
  connection.query(sql, params, (err, dbres) => {
    if (err) {
      res.status(400).send({ error: true });
    } else {
      res.status(202).send(dbres);
    }
  });
});

app.delete("/opiniones", (req, res) => {
  const params = [req.query.id_opiniones];
  const sql = `DELETE FROM opiniones WHERE opiniones.id_opiniones = ?`;
  if (params) {
    connection.query(sql, params, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        res.status(204).send(dbres);
      }
    });
  }
});

app.post("/cliente-registro", (request, response) => {

  let mailOptions = {
    from: 'UrTurn',
    to: request.body.email,
    subject:'Bienvenido a UrTurn!',
    text: `Hola, ${request.body.email} \n No pierdas ni un segundo y pide tu turno allá donde quieras!`
  };

  encPassword = crypto.AES.encrypt(request.body.password, key, {iv: ive}).toString();

  let params1 = [request.body.nombre_cliente, request.body.telefono];
  let params3 = [0, request.body.email, encPassword];

  let sql1 = `INSERT INTO usuario_cliente (nombre_cliente,telefono) VALUES (?,?);`;
  let sql2 = `SELECT id_usuario_cliente FROM usuario_cliente WHERE nombre_cliente = ? AND telefono = ?;`;
  let sql3 = `INSERT INTO login (id_usuario_cliente, email, contraseña) VALUES (?,?,?);`;

  connection.query(sql1, params1, (error1, rs) => {
    if (!error1) {
      connection.query(sql2, params1, (error2, rs2) => {
        if (!error2) {
          params3[0] = rs2[0].id_usuario_cliente;

          connection.query(sql3, params3, (error3, rs3) => {
            if (!error3) {
              transporter.sendMail(mailOptions, (error4, rs4) =>  {
                if(!error4) {
                  console.log(`Email enviado a ${request.body.email}`);
                  salida = { error: false, code: 200, mensaje: rs3, rs4 };
                  response.send(salida);
                  
                }else {
                  salida = { error: true, code: 200, mensaje: error4 };
                  response.send(salida);
                }
              })
            } else {
              salida = { error: true, code: 200, mensaje: error3 };
              response.send(salida);
            }
          });
        } else {
          salida = { error: true, code: 200, mensaje: error2 };
          response.send(salida);
        }
      });
    } else {
      salida = { error: true, code: 200, mensaje: error1 };
      response.send(salida);
    }
  });
});

app.listen(3000);

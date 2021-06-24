const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

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

let salida = ""

app.get("/favoritos",
    function(request, response){
        let categoria = request.query.categoria
        let cp = request.query.cp
        let id = request.query.id
        let params = []
        let sql=``

        if(cp==null && categoria==null ){
            params = [id]
            sql=`SELECT e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE f.id_usuario_cliente=?`

        }
        else if(cp==null){
            params = [categoria, id]
            sql = `SELECT e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE e.categoria=? AND f.id_usuario_cliente=?`
        }
        else if(categoria==null){
            params = [cp, id]
            sql = `SELECT e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f 
            JOIN urturn.usuario_empresa AS e ON (f.id_usuario_empresa=e.id_usuario_empresa) 
            JOIN urturn.usuario_cliente AS c ON (f.id_usuario_cliente=c.id_usuario_cliente) 
            WHERE codigo_postal=? AND f.id_usuario_cliente=?`
        }
        else {
            params4 = [categoria, cp, id]
            sql = `SELECT e.nombre_empresa, e.imagen_url, e.direccion, e.tiempo_espera FROM urturn.favoritos AS f
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

app.post("/favoritos",
    function(request, response){
        id_usuario_cliente = request.body.id_usuario_cliente
        id_usuario_empresa = request.body.id_usuario_empresa
        fecha = request.body.fecha
        params = [ id_usuario_cliente, id_usuario_empresa, fecha]
        sql = `INSERT INTO urturn.favoritos ( id_usuario_cliente, id_usuario_empresa, fecha)
        VALUES (?,?,NOW())`
        
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

app.get("/local", (req, res) => {
  let sqlByID = `SELECT nombre_empresa, direccion, tiempo_espera, descripcion, apertura, cierre, imagen_url
                    FROM usuario_empresa
                    WHERE id_usuario_empresa = ?`;
  let sqlAll = `SELECT nombre_empresa, tiempo_espera FROM urturn.usuario_empresa
                    WHERE (categoria = ? AND codigo_postal = ?)`;
  let id = req.query.id;
  let busqueda = [req.query.categoria, req.query.codigo_postal];

  if (id) {
    connection.query(sqlByID, id, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (result) {
        res.json(result);
      } else {
        res.json({ error: false, codigo: 200, mesaje: "Búsqueda correcta" });
      }
    });
  } else if (busqueda) {
    connection.query(sqlAll, busqueda, (err, result) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else if (result) {
        res.json(result);
      } else {
        res.json({ error: false, codigo: 200, mesaje: "Búsqueda correcta" });
      }
    });
  }
  // let sqlAll = `SELECT nombre_empresa, tiempo_espera FROM urturn.usuario_empresa
  //                   WHERE (categoria = ? AND codigo_postal = ?);`;
  // let id = req.query.id;
  // let busqueda = [req.query.categoria, req.query.codigo_postal];

  // if (id) {
  //   connection.query(sqlByID, id, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err);
  //     } else if (result) {
  //       res.json(result);
  //     } else {
  //       res.json({ error: false, codigo: 200, mesaje: "Búsqueda correcta" });
  //     }
  //   });
  // } else if (busqueda) {
  //   connection.query(sqlAll, busqueda, (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.send(err);
  //     } else if (result) {
  //       res.json(result);
  //     } else {
  //       res.json({ error: false, codigo: 200, mesaje: "Búsqueda correcta" });
  //     }
  //   });
  // }
});

/************************************************************************************/

app.get("/login", (request, response) => {
  let params = [
    request.query.email,
    request.query.contraseña,
    request.query.email,
    request.query.contraseña,
  ];

  // let sql = `SELECT uc.id_usuario_cliente FROM usuario_cliente AS uc 
  //               INNER JOIN login as l on (uc.id_usuario_cliente = l.id_usuario_cliente) 
  //               WHERE l.email = ? and l.contraseña = ?
  //               UNION
  //               SELECT ue.id_usuario_empresa FROM usuario_empresa AS ue 
  //               INNER JOIN login as l on (ue.id_usuario_empresa = l.id_usuario_empresa) 
  //               WHERE l.email = ? and l.contraseña = ?;`;

  let sql = `select id_usuario_cliente, id_usuario_empresa from login where email=? and contraseña=?;`

  connection.query(sql, params, (error, rs) => {
    if (!error) {
      salida = { error: false, code: 200, mensaje: rs };
      console.log(rs[0].id_usuario_cliente);
      console.log(rs[0].id_usuario_empresa);
      response.send(salida);
    } else {
      salida = { error: true, code: 200, mensaje: error };
      response.send(salida);
    }
  });
});

app.post("/empresa-registro", (request, response) => {

  let params1 = [request.body.nombre_empresa, request.body.telefono];
  let params3 = [0, request.body.email, request.body.password];

  let sql1 = `INSERT INTO usuario_empresa (nombre_empresa,telefono) VALUES (?,?);`;
  let sql2 = `SELECT id_usuario_empresa FROM usuario_empresa WHERE nombre_empresa = ? AND telefono = ?;`;
  let sql3 = `INSERT INTO login (id_usuario_empresa, email, contraseña) VALUES (?,?,?);`;

  connection.query(sql1, params1, (error1, rs) => {
    if (!error1) {
      connection.query(sql2, params1, (error2, rs2) => {
        if (!error2) {
          params3[0] = rs2[0].id_usuario_empresa;

          connection.query(sql3, params3, (error3, rs3) => {
            if (!error3) {
              salida = { error: false, code: 200, mensaje: rs3 };
              response.send(salida);
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
  let paramsCliente = [req.query.id_usuario_cliente];
  const sqlCliente = `  
  SELECT op.id_opiniones, userC.id_usuario_cliente ,userC.nombre_cliente, userC.imagen_url,  op.nota, op.opinion, op.fecha
  FROM urturn.opiniones AS op
  JOIN urturn.usuario_cliente AS userC 
  ON op.id_usuario_cliente = userC.id_usuario_cliente
  WHERE userC.id_usuario_cliente = ?;`;

  let paramsEmpresa = [req.query.id_usuario_empresa];
  const sqlEmpresa = `
  SELECT op.id_opiniones, userE.id_usuario_empresa ,userE.nombre_empresa, userE.imagen_url,  op.nota, op.opinion, op.fecha
  FROM urturn.opiniones AS op
  JOIN urturn.usuario_empresa AS userE 
  ON op.id_usuario_empresa = userE.id_usuario_empresa
  WHERE userE.id_usuario_empresa = ?;`;

  const sqlAll = `SELECT * FROM urturn.opiniones`;

  if (paramsCliente[0] != undefined && paramsEmpresa[0] == undefined) {
    connection.query(sqlCliente, paramsCliente, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        res.status(200).send(dbres);
      }
    });
  } else if (paramsEmpresa[0] != undefined && paramsCliente[0] == undefined) {
    connection.query(sqlEmpresa, paramsEmpresa, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        res.status(200).send(dbres);
      }
    });
  } else {
    connection.query(sqlAll, (err, dbres) => {
      if (err) {
        res.status(400).send({ error: true });
      } else {
        console.log(dbres);
        res.status(200).send(dbres);
      }
    });
  }
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
  INSERT INTO opiniones (id_usuario_cliente, id_usuario_empresa, nota, opinion, fecha) VALUES (?,?,?,?,NOW())
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

app.listen(3000);

'use strict';

// cargamos el driver
const mysql = require('mysql');

// creamos una conexión
const conexion = mysql.createConnection({
  host: 'didimo.es',
  user: 'usuariocurso',
  password: 'us3r',
  database: 'cursonode'
});

// conectamos
conexion.connect();

// lanzamos una consulta
conexion.query('SELECT * FROM agentes', (err, filas, campos) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  // visualizamos resultados
  console.log(filas);
})

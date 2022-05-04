'use strict';

// cargar librería de express
const express = require('express');

// crear la aplicación
const app = express();

app.use((req, res, next) => {
  console.log('recibo una petición a', req.originalUrl);
  next();
})

// ponemos métodos de la aplición
app.get('/', (req, res, next) => {
  res.send('hola');
});

// middleware
app.get('/pepe', (req, res, next) => {
  res.send('soy pepe');
});

app.get('/luis', (req, res, next) => {
  res.send('soy luis');
});

// arrancamos la aplicación
app.listen(8080, () => {
  console.log('Servidor HTTP arrancado en http://localhost:8080');
});
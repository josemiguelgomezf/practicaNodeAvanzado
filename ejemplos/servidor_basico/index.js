'use strict';

// cargar librería http
const http = require('http');
const Chance = require('chance');

const chance = new Chance();

// definir un servidor
const server = http.createServer(function(request, response) {
  response.writeHead(200, { 'Content-type' : 'text/html' });
  response.end(`Wake up, <b>${chance.name()}</b>...`);
})

// arrancar el servidor
server.listen(8080, function() {
  console.log('Servidor arrancado en http://localhost:8080');
})

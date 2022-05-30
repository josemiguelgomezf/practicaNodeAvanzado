'use strict';

const mongoose = require('mongoose');
const config = require('../../brandapp/config.js');

mongoose.connection.on('error', err => {
  console.log('Error de conexión a MongoDB', err);
  process.exit(1);
});

mongoose.connection.once('open', () => {
  console.log('Conectado a MongoDB en la BD:', mongoose.connection.name);
});

mongoose.connect(config.MONGODB);

//Optional.
module.exports = mongoose.connection;
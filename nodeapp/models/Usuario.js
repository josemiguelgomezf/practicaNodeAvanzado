'use strict';

const mongoose = require('mongoose');

// definir un esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  // infoDeInteres: mongoose.Schema.Types.Mixed
}, {
  // en caso de que queramos conectar este modelo con una colección con otro nombre
  // collection: 'otro_nombre'
});

// creamos un método de instancia
usuarioSchema.methods.saluda = function() {
  console.log('Hola, mi email es: ', this.email)
}

// creo el modelo con ese esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// opcional - exporto el modelo
module.exports = Usuario;

'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailTransportConfigure = require('../lib/emailTransportConfigure');
const config = require('../config');
const nodemailer = require('nodemailer')

// definir un esquema
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String } 
  // infoDeInteres: mongoose.Schema.Types.Mixed
}, {
  // en caso de que queramos conectar este modelo con una colección con otro nombre
  // collection: 'otro_nombre'
});

// creamos un método de instancia
usuarioSchema.methods.saluda = function() {
  console.log('Hola, mi email es: ', this.email)
}

// creamos un método para desencriptar contraseña
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

// creamos un método para enviar un email al usuario
usuarioSchema.methods.enviarEmail = async function(asunt, body) {
  //crear el transport
  const transport = await emailTransportConfigure();
  //enviar el email
  const result = await transport.sendMail({
    from: config.EMAILFROM,
    to: this.email,
    subject: asunt,
    html: body
  });

  console.log("Message sent: %s", result.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));

  return result;
}

//statics porque no es una instancia de un usuario
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}


// creo el modelo con ese esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// opcional - exporto el modelo
module.exports = Usuario;

'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');

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
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "josemiguel.gmezfdez@gmail.com", // list of receivers
    subject: asunt, // Subject line
    text: body, // plain text body
    html: `<b>${asunt}</b>`, // html body
  });
}

//statics porque no es una instancia de un usuario
usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}


// creo el modelo con ese esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// opcional - exporto el modelo
module.exports = Usuario;

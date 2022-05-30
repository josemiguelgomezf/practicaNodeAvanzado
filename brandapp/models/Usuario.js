'use strict';

const mongoose = require('mongoose');
//Encrypt passwords bcrypt.
const bcrypt = require('bcrypt');
const emailTransportConfigure = require('../lib/emailTransportConfigure');
const config = require('../config');
const nodemailer = require('nodemailer')

//Define a schema.
const usuarioSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String } 
});

//Create an instance method.
usuarioSchema.methods.saluda = function() {
  console.log('Hello, my email is: ', this.email)
}

//Method to desencrypt password.
usuarioSchema.methods.comparePassword = function(passwordEnClaro) {
  return bcrypt.compare(passwordEnClaro, this.password);
}

//Create a method to send an email to the user.
usuarioSchema.methods.enviarEmail = async function(asunt, body) {
  //Create the transport.
  const transport = await emailTransportConfigure();
  //Send email.
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

usuarioSchema.statics.hashPassword = function(passwordEnClaro) {
  return bcrypt.hash(passwordEnClaro, 7)
}

//Create a model with this schema.
const Usuario = mongoose.model('Usuario', usuarioSchema);

//Export the model.
module.exports = Usuario;

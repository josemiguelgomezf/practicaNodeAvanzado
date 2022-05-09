'use strict';

import fsPromise from 'fs/promises';
import readline from 'readline';

// conexión a la base de datos
// const dbConnection = require('./lib/connectMongoose');
import dbConnection from "./lib/connectMongoose.js";
// import agenteData  from './initDB.agentes.json';

// cargar modelos
import Agente from './models/Agente.js';
import Usuario from './models/Usuario.js';

dbConnection.once('open', () => {
  main().catch(err => console.log('Hubo un error', err));
})


async function main() {

  const borrar = await pregunta('Estas seguro de que quieres borrar la base de datos?');
  if (!borrar) {
    process.exit(0);
  }

  // inicializar agentes
  await initAgentes();

  // inicializar usuarios
  await initUsuarios();

  // desconectar la base de datos
  dbConnection.close();
}

async function initUsuarios() {
  // borrar todos los documentos de usuarios que haya en la colección
  const deleted = await Usuario.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} usuarios.`);

  const data = await fsPromise.readFile('initDB.usuarios.json', 'utf-8');
  const usuarioData = JSON.parse(data);

  // crear usuarios iniciales
  const usuarios = await Usuario.insertMany(usuarioData);
  console.log(`Creados ${usuarios.length} usuarios.`);
}

async function initAgentes() {
  // borrar todos los documentos de agentes que haya en la colección
  const deleted = await Agente.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} agentes.`);

  const data = await fsPromise.readFile('initDB.agentes.json', 'utf-8');
  const agenteData = JSON.parse(data);

  // crear agentes iniciales
  const agentes = await Agente.insertMany(agenteData);
  console.log(`Creados ${agentes.length} agentes.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    // conectar readline a la consola
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    // hacemos pregunta
    rl.question(texto, respuesta => {
      rl.close();
      if (respuesta.toLowerCase() === 'si') {
        resolve(true);
        return;
      }
      resolve(false);
    })
  });
}
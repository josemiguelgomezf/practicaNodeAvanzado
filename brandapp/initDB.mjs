'use strict';

import fsPromise from 'fs/promises';
import readline from 'readline';

//BBDD
import dbConnection from "./lib/connectMongoose.js";


//Models
import Ad from './models/Ad.js';
import Usuario from './models/Usuario.js';

dbConnection.once('open', () => {
  main().catch(err => console.log('There was a mistake.', err));
})


async function main() {

  const borrar = await pregunta('Are you sure you want deleted BBDD?');
  if (!borrar) {
    process.exit(0);
  }
  await initAds();
  await initUsuarios();
  dbConnection.close();
}

async function initUsuarios() {
  //Deleted all users.
  const deleted = await Usuario.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} users.`);

  //Create initial users.
  const usuarios = await Usuario.insertMany([
    {
      "email": "user@example.com",
      "password": await Usuario.hashPassword('1234')
    },
    {
      "email": "josemiguel.gmezfdez@gmail.com",
      "password": await Usuario.hashPassword('1234')
    }
  ]);
  console.log(`Created ${usuarios.length} users.`);
}

async function initAds() {
  //Deleted all ads.
  const deleted = await Ad.deleteMany();
  console.log(`Deleted ${deleted.deletedCount} ads.`);

  const data = await fsPromise.readFile('initDB.ads.json', 'utf-8');
  const adData = JSON.parse(data);

  //Create initial Ads.
  const ads = await Ad.insertMany(adData);
  console.log(`Created ${ads.length} ads.`);
}

function pregunta(texto) {
  return new Promise((resolve, reject) => {
    //Connect readline with console.
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    //Do a question.
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
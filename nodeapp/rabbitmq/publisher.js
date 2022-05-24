'use strict';

const connectionPromise = require('./connectAMQP');

const QUEUE_NAME = 'tareas';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {

  // conectar al servidor AMQP (RabbitMQ)
  const connection = await connectionPromise;

  // conectar a un canal
  const canal = await connection.createChannel();

  // asegurar que existe una cola
  await canal.assertQueue(QUEUE_NAME, {
    durable: true // the queue will survive broker restarts
  });

  let sendAgain = true;

  while(true) {

    if (!sendAgain) {
      console.log('Buffer lleno, esperando a evento drain...');
      // para hasta que ocurra el evento drain
      await new Promise(resolve => canal.on('drain', resolve))
      // ya se ha vaciado el buffer y puedo seguir emitiendo
    }

    // enviar un mensaje al worker
    const message = {
      nombre: 'tarea a realizar número ' + Date.now()
    };

    sendAgain = canal.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(message)), {
      persistent: true // the message will survive broker restarts
    });
    console.log('publicado el mensaje', message.nombre);

    await sleep(10000);
  }
}

main().catch(err => console.log('Hubo un error', err));
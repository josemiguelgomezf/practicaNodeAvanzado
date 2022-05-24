'use strict';

const connectionPromise = require('./connectAMQP');

const QUEUE_NAME = 'tareas';
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {

  const connection = await connectionPromise;

  const canal = await connection.createChannel();

  await canal.assertQueue(QUEUE_NAME, {
    durable: true // the queue will survive broker restarts
  });

  // cuantos mensajes voy a procesar en paralelo
  //canal.prefetch(100);

  canal.consume(QUEUE_NAME, async message => {
    try {
      // proceso el mensaje
      await sleep(1000);
      console.log(message.content.toString());

      // confirmo que he procesado el mensaje
      canal.ack(message);

    } catch (err) {
      console.log('Error en el mensaje', message);
      // diferenciar si ha sido un error operacional o no
      canal.nack(message); // dead letter queue
    }
  });

}

main().catch(err => console.log('Hubo un error', err));
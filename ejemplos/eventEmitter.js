'use strict';

const EventEmitter = require('events');

// creamos un emisor de eventos
const emisor = new EventEmitter();

// nos suscribimos a eventos
emisor.on('llamada de teléfono', (quien) => {
  if (quien === 'madre') return;
  console.log('ring ring');
});

emisor.once('llamada de teléfono', (quien) => {
  console.log('brrr brrr');
});

// emitimos eventos
emisor.emit('llamada de teléfono', 'madre');

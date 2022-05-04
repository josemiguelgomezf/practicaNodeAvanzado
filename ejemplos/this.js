'use strict';

// uso de this

// creamos un construstor de objetos
function Fruta(nombre) {
  this.nombre = nombre;

  // método
  this.saluda = function() { // si usamos una arrow function, no se perdería el this
    console.log('Hola, soy', this.nombre); // este this es el que podemos perder
  }

} // al llamalo con new, devuelve el objeto que haya en this

const limon = new Fruta('limon');

// console.log(limon);
// donde estén los () de ejecución,
// this será: de derecha a izquierda lo que hay después del primer punto
// limon.saluda();

// así perdemos el this
const saludador = limon.saluda;
// saludador();
// así nos aseguramos de que lo tiene
saludador.bind(limon)();

setTimeout(limon.saluda, 2000);
// setTimeout(limon.saluda.bind(limon), 2000);
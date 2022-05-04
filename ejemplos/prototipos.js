'use strict';

function Persona(nombre) {
  this.nombre = nombre;

  // this.saluda  = function() {
  //   console.log('Soy', this.nombre);
  // }

}

// pongo el método de saludar en el prototipo de las personas
Persona.prototype.saluda = function() {
  console.log('Soy', this.nombre);
}

const maria = new Persona('Maria');
const paco = new Persona('Paco');

// Persona.prototype.saluda = () => console.log('adios');

maria.saluda();
paco.saluda();

// Herencia de Persona -----------------------------------------------------------

// Crear tipo Agente que herede de Persona

function Agente(nombre) {
  // heredar el constructor de Persona
  // llamar a Persona() con mi 'this'
  Persona.call(this, nombre);
}

// heredar las propiedades y métodos de las personas
// Poner en el prototipo de los agentes, una persona
Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente;

const smith = new Agente('Smith');

smith.saluda();

// Herencia múltiple ---------------------------------------------------

function Superheroe() {
  this.vuela = function() {
    console.log(this.nombre, 'vuela');
  }
}

// Para que los agentes hereden también de los superheroes, uso el patrón mixin
// o sea, copiar todas las propiedades de un superheroe al prototipo de los agentes
Object.assign(Agente.prototype, new Superheroe());

smith.vuela();
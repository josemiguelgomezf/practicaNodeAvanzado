'use strict';

const mongoose = require('mongoose');

// definir un esquema
const agenteSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: { type: Number, min: 18, max: 120, index: true },
  // infoDeInteres: mongoose.Schema.Types.Mixed
}, {
  // en caso de que queramos conectar este modelo con una colección con otro nombre
  // collection: 'otro_nombre'
});

// creamos método estático (del modelo)
agenteSchema.statics.lista = function(filtros, skip, limit, select, sort) {
  const query = Agente.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
}

// creamos un método de instancia
agenteSchema.methods.saluda = function() {
  console.log('Hola, soy', this.name)
}

// creo el modelo con ese esquema
const Agente = mongoose.model('Agente', agenteSchema);

// opcional - exporto el modelo
module.exports = Agente;

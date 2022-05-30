'use strict';

const mongoose = require('mongoose');
const fs = require('fs-extra')
const path2 = require('path');
const cote = require('cote')

const thumbnailRequester = new cote.Requester({
  name: 'Thumbnail creator client.'
}, { log: false, statusLogsEnabled: false })

//Define a schema.
const adSchema = mongoose.Schema({
  title: { type: String, index: true },
  sale: { type: String, index: true },
  price: { type: Number, min: 1, max: 999999, index: true },
  foto: { type: String, index: true }
});

//Create static method.
adSchema.statics.lista = function(filtros, skip, limit, select, sort) {
  const query = Ad.find(filtros);
  query.skip(skip);
  query.limit(limit);
  query.select(select);
  query.sort(sort);
  return query.exec();
}

//Create instance method.
adSchema.methods.saluda = function() {
  console.log('Hello, I am ', this.name)
}

adSchema.methods.setFoto = async function ({ path, originalName }) {
  console.log(originalName)
  if (!originalName) return

  const imagePublicPath = path2.join(__dirname, '../public/images/anuncios', originalName)
  await fs.copy(path, imagePublicPath)

  this.foto = originalName

  //Create thumbnail.
  thumbnailRequester.send({ type: 'createThumbnail', image: imagePublicPath })
}

//Create a model with this schema.
const Ad = mongoose.model('Ad', adSchema);

//Export the model.
module.exports = Ad;

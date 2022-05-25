'use strict';

const express = require('express');
const createError = require('http-errors');
const Agente = require('../../models/Agente');
const upload = require('../../lib/multerConfig');

const router = express.Router();

/**
 * @openapi
 * /api/agentes:
 *  get:
 *    description: Devuelve una lista de agentes
 *    responses:
 *      200:
 *        description: Returns JSON
 */
router.get('/', async (req, res, next) => {
  try {
    const name = req.query.name;
    const age = req.query.age;
    const foto = req.query.foto;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select; // campos que quiero
    const sort = req.query.sort;

    const filtros = {};

    if (name) {
      filtros.name = name;
    }

    if (age) {
      filtros.age = age;
    }

    if (foto) {
      filtros.foto = foto;
    }

    const agentes = await Agente.lista(filtros, skip, limit, select, sort);

    res.json({ results: agentes })

  } catch (err) {
    next(err);
  }
});

// GET /api/agentes/:id
// Devuelve un agente
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const agente = await Agente.findOne({ _id: id });

    if (!agente) {
      next(createError(404));
      return;
    }

    agente.saluda();

    res.json({ result: agente });
  } catch (err) {
    next(err);
  }
});

// POST /api/agentes
// Crea un nuevo agente
router.post('/', upload.single('foto'), async (req, res, next) => {
  try {
    const agente = new Agente(req.body);

    // save image
    await agente.setFoto({
      path: req.file.path,
      originalName: req.file.originalname
    })

    const agenteGuardado = await agente.save();

    res.status(201).json({ result: agenteGuardado });

  } catch (err) {
    next(err);
  }
})

// DELETE /api/agentes/:id
// Elimina un agente
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Agente.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err)
  }

})

// PUT /api/agentes:id
// Actualizar un agente
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const agenteData = req.body;

    let agenteActualizado
    try {
      agenteActualizado = await Agente.findByIdAndUpdate(id, agenteData, {
        new: true // esta opción sirve para que nos devuelva el estado final del documento
      });
    } catch (err) {
      next(createError(422, 'invalid id'));
      return;
    }

    if (!agenteActualizado) {
      next(createError(404));
      return;
    }

    res.json({ result: agenteActualizado });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
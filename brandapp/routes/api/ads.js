'use strict';

const express = require('express');
const createError = require('http-errors');
const Ad = require('../../models/Ad');
const upload = require('../../lib/multerConfig');

const router = express.Router();

/**
 * @openapi
 * /api/ads:
 *  get:
 *    description: Return an ads list.
 *    responses:
 *      200:
 *        description: Returns JSON
 */
router.get('/', async (req, res, next) => {
  try {
    const title = req.query.title;
    const price = req.query.price;
    const sale = req.query.sale;
    const foto = req.query.foto;
    const skip = req.query.skip;
    const limit = req.query.limit;
    const select = req.query.select; 
    const sort = req.query.sort;

    const filtros = {};

    if (title) {
      filtros.title = title;
    }

    if (price) {
      filtros.price = price;
    }

    if (sale) {
      filtros.sale = sale;
    }

    if (foto) {
      filtros.foto = foto;
    }

    const ads = await Ad.lista(filtros, skip, limit, select, sort);

    res.json({ results: ads })

  } catch (err) {
    next(err);
  }
});

// GET /api/ads/:id
//Return an ad.
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    const ad = await Ad.findOne({ _id: id });

    if (!ad) {
      next(createError(404));
      return;
    }

    ad.saluda();

    res.json({ result: ad });
  } catch (err) {
    next(err);
  }
});

// POST /api/ads
// Create a new ad
router.post('/', upload.single('foto'), async (req, res, next) => {
  try {
    const ad = new Ad(req.body);

    // save image
    await ad.setFoto({
      path: req.file.path,
      originalName: req.file.originalname
    })

    const adSave = await ad.save();

    res.status(201).json({ result: adSave });

  } catch (err) {
    next(err);
  }
})

// DELETE /api/ads/:id
// Delete an ad
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;

    await Ad.deleteOne({ _id: id });

    res.json();
  } catch (err) {
    next(err)
  }

})

module.exports = router;
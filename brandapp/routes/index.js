var express = require('express');
const { query, validationResult } = require('express-validator');
const { sleep } = require('../lib/utils');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  const segundo = (new Date()).getSeconds();

  res.locals.ejemplo = '<script>alert("esto es un ejemplo")</script>';

  res.locals.usuarios = [
    { nombre: 'Smith', edad: 30 },
    { nombre: 'Brown', edad: 37 },
  ];

  res.locals.condicion = {
    segundo,
    esPar: segundo % 2 === 0
  }

  res.render('index', { color: 'red' });
});

router.get('/otraruta', (req, res, next) => {
  res.send('respuesta');
})

router.get('/parametroenruta/:dato([0-9]+)', (req, res, next) => {
  const dato = req.params.dato;
  console.log(req.params);

  res.send('ok');
});

// /talla/L/color/verde
router.get('/talla/:talla(M|L|XL)?/color/:color?', (req, res, next) => {
  const talla = req.params.talla;
  const color = req.params.color;

  console.log(req.params);

  res.send(`ok talla ${talla} y del color ${color}`);
});

// http://localhost:3000/enquerystring?talla=XXL&color=rojo
router.get('/enquerystring', [
  // validaciones
  query('talla').isNumeric().withMessage('debe ser numérica'),
  query('color').custom(color => { return color === 'red';}).withMessage('solo vale red') // validación custom
], (req, res, next) => {
  validationResult(req).throw();
  const talla = req.query.talla;
  const color = req.query.color;

  console.log(req.query);

  res.send(`ok la talla ${talla} y del color ${color}`);
});

router.post('/enelbody', (req, res, next) => {
  const nombre = req.body.nombre;

  console.log(req.body);

  res.send(`Recibido el nombre ${nombre}`);
});

router.get('/espera', async (req, res, next) => {
  try {
    await sleep(3000);
    res.send('pasaron los 3 segundos');
  } catch (err) {
    next(err)
  }
})

module.exports = router;
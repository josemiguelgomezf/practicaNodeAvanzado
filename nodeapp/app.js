var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { isAPIRequest } = require('./lib/utils');
const swaggerMiddleware = require('./lib/swaggerMiddleware');
const i18n = require('./lib/i18nConfigure');
const LoginController = require('./controllers/loginController');

var app = express();

require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'NodeApp';

/**
 * Middlewares de nuestra aplicación
 * Los evalua Express ante cada petición que recibe
 */
app.use(logger('dev')); // middleware de log
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // middleware de estaticos
app.use('/api-docs', swaggerMiddleware);

/**
 * Rutas de mi API
 */
app.use('/api/agentes', require('./routes/api/agentes'));

//Setup de i18n
app.use(i18n.init);

const loginController = new LoginController();

/**
 * Rutas de mi website
 */
app.use('/',          require('./routes/index'));
app.use('/features',  require('./routes/features'));
app.use('/change-locale',  require('./routes/change-locale'));
app.get('/login', loginController.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // gestionando error de validación
  if (err.array) {
    // error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `(${errInfo.location}) ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  // si es un error en el API respondo JSON
  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;

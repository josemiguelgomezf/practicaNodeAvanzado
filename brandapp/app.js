var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { isAPIRequest } = require('./lib/utils');
const swaggerMiddleware = require('./lib/swaggerMiddleware');
const i18n = require('./lib/i18nConfigure');
const LoginController = require('./controllers/loginController');
const PrivadoController = require('./controllers/privadoController');
const session = require('express-session');
const sessionAuth = require('./lib/sessionAuth');
const MongoStore = require('connect-mongo');
const config = require('./config.js');
const loginController = new LoginController();
const privadoController = new PrivadoController();
const jwtAuth = require('./lib/jwtAuth.js');
var app = express();

require('./lib/connectMongoose');

//View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

app.locals.title = 'BrandApp';

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
app.use('/api/ads', jwtAuth, require('./routes/api/ads'));
app.post('/api/login', loginController.postJWT);

//Setup de i18n
app.use(i18n.init);



//Setup session website
app.use(session({
  name:"session",
  secret: '912dasd3212312jdasd1',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000*60*60*24
  },
  store: MongoStore.create({
    mongoUrl: config.MONGODB
  })
}));

//ponemos la session disponible en las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Rutas de mi website
 */
app.use('/',          require('./routes/index'));
app.use('/controversy',  require('./routes/controversy'));
app.use('/change-locale',  require('./routes/change-locale'));
app.get('/login', loginController.index);
app.post('/login', loginController.post);
app.get('/privado', sessionAuth, privadoController.index);
app.get('/logout', loginController.logout);

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

const rootRoute = require('express').Router();
const cors = require('cors');
const { errors } = require('celebrate');
const {
  requestLogger,
  errorLogger,
} = require('../middlewares/logger');

rootRoute.use(cors());

rootRoute.use(requestLogger);

rootRoute.use('/', require('./auth'));

rootRoute.use(require('../middlewares/auth'));

rootRoute.use('/cards', require('./cards'));
rootRoute.use('/users', require('./users'));
rootRoute.use('/', require('./notFound'));

rootRoute.use(errorLogger);

rootRoute.use(errors());

rootRoute.use(require('../middlewares/error-handler'));

module.exports = rootRoute;
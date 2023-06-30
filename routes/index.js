// List all of the routes

const routes = require('express').Router();

routes.use('/', require('./swaggerRoutes'));

routes.use('/contacts', require('./contacts'));
// localhost:8080/professional/


// exports the routes
module.exports = routes;
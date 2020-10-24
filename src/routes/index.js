var express = require('express');
var router = express.Router();
const home = require('./pdf');

const routes = (server) => {
    server.use('/', home);
}
module.exports = routes;

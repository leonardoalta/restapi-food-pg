// server/index.js
const path = require('path');
const express = require('express');
const routes = require('../routes');

const server = express();

// 1) Sirve archivos estáticos desde /public
server.use(express.static(path.join(__dirname, '../public')));

// 2) Monta la API REST en /api
server.use('/api', express.json(), routes);

module.exports = server;

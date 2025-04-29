const express = require('express');
const CRutas = require('../controlador/ClienteControlador');
const router = express.Router();

router.post('/cliente', CRutas.crearCliente);
module.exports = router; 
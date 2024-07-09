const express = require('express');
const router = express.Router();


const usersController = require("../controllers/usersController.js");

// RUTA DE LOGIN
router.get('/login', usersController.login);

// RUTA DE REGISTER
router.get('/register', usersController.register);

module.exports = router; 
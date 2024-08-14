const express = require('express');
const router = express.Router();
const userValidationRules = require("../validators/userValidator");
const usersController = require("../controllers/usersController.js");

// RUTA DE LOGIN
router.get('/login', usersController.login);
router.post('/login', usersController.loginProcess);

// RUTA DE REGISTER
router.get('/register', usersController.register);
router.post('/register', userValidationRules, usersController.createUser);

module.exports = router; 
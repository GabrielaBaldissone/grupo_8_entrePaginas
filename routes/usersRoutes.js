const express = require('express');
const router = express.Router();
const guestMiddleware = require("../middlewares/guestMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const userValidationRules = require("../validators/userValidator");
const usersController = require("../controllers/usersController.js");
const fileValidator = require('../middlewares/fileValidatorMiddleware.js');

// RUTA DE LOGIN
router.get('/login', guestMiddleware, usersController.login);
router.post('/login', usersController.loginProcess);

// RUTA DE REGISTER
router.get('/register', guestMiddleware, usersController.register);
router.post('/register', fileValidator("avatar", "users/register"), userValidationRules, usersController.createUser);

router.get("/profile", authMiddleware, usersController.getUserProfile);
router.post("/logout", usersController.logout);


module.exports = router; 
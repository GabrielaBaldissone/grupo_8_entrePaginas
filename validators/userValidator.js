const { body } = require("express-validator");

const userValidationRules = [
    body("firstName").trim().notEmpty().withMessage("Debe completar el campo nombres"),
    body("lastName").trim().notEmpty().withMessage("Debe completar el campo apellidos"),
    body("phone").trim().notEmpty().withMessage("Debe completar el campo telefono").bail()
    .isInt().withMessage("Debe contener valores numericos"),
    body("email").notEmpty().withMessage("Debe completar el campo email").bail()
    .isEmail().withMessage("Debe completar con un mail valido"),
    body("password").notEmpty().withMessage("Debe completar el campo contraseña").bail()
    .isLength({ min:6 }).withMessage("La contraseña debe tener al menos 6 caracteres")
];

module.exports = userValidationRules;
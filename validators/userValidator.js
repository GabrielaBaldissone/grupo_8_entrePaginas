const { body } = require("express-validator");
const path = require('path');

const userValidationRules = [
    body("firstName")
        .trim()
        .notEmpty()
        .withMessage("Debe completar el campo nombres")
        .isLength({ min: 2 })
        .withMessage("El nombre debe tener al menos 2 caracteres"),
    
    body("apellido")
        .trim()
        .notEmpty()
        .withMessage("Debe completar el campo apellidos")
        .isLength({ min: 2 })
        .withMessage("El apellido debe tener al menos 2 caracteres"),

    body("phone")
        .trim()
        .notEmpty()
        .withMessage("Debe completar el campo telefono")
        .bail()
        .isInt()
        .withMessage("Debe contener valores numéricos"),

    body("email")
        .notEmpty()
        .withMessage("Debe completar el campo email")
        .bail()
        .isEmail()
        .withMessage("Debe completar con un mail válido")
        .custom(async (value) => {
            const userInDB = await db.User.findOne({ where: { email: value } });
            if (userInDB) {
                throw new Error('Este email ya está registrado');
            }
        }),

    body("password")
        .notEmpty()
        .withMessage("Debe completar el campo contraseña")
        .bail()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .custom(value => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars) {
                throw new Error('La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial');
            }
            return true;
        }),

];

module.exports = userValidationRules;

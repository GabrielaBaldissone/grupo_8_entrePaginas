const { body } = require('express-validator');
const path = require("path");

const productValidators = [
    body('name')
        .trim().notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
        
    body('author')
    .trim().notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
    
    body('stock')
        .notEmpty().withMessage("El stock es obligatorio").bail()
        .isInt({min: 0}).withMessage("El stock debe ser un número entero positivo"),

    body("image").custom((value, { req })=>{
        let file = req.file;
        let acceptedExtensions = [".jpg", ".jpeg", ".png"];
        
        if(!file){
            req.file = { filename: "default.png"};
        }else{
            let fileExtension = path.extname(file.originalname).toLowerCase();
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`);
            }
        }

        return true;
        
    }),

    body('price')
        .notEmpty().withMessage("El precio es obligatorio").bail()
        .isFloat({min: 0}).withMessage("El precio debe ser un número entero positivo"),
        
    body('description')
        .trim().notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres')

];

module.exports = productValidators;

const { body } = require('express-validator');

const productValidators = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
    
    body('description')
        .notEmpty().withMessage('La descripción es obligatoria')
        .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

    body('image')
        .custom((value, { req }) => {
            if (!req.file) {
                return true;
            }
            const validExtensions = ['image/jpeg', 'image/png', 'image/gif'];
            if (!validExtensions.includes(req.file.mimetype)) {
                throw new Error('La imagen debe ser un archivo válido (JPG, JPEG, PNG, GIF)');
            }
            return true;
        })
];

module.exports = productValidators;

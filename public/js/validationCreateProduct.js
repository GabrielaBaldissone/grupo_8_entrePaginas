document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-create', {
        errorLabelStyle: {
            color: 'red',
            fontSize: '16px',
        },
        validateBeforeSubmitting: true,
        lockForm: true,
        focusInvalidField: true,
    });

    validation
    .addField('#nombreProducto', [
        {
            rule: "required",
            errorMessage: "El nombre del producto es obligatorio",
        },
        {
            rule: "minLength",
            value: 5, 
            errorMessage: "El nombre debe tener al menos 5 caracteres",
        }
    ])
    .addField('#autorProducto', [
        {
            rule: "required",
            errorMessage: "El autor del producto es obligatorio",
        },
        {
            rule: "minLength",
            value: 3, 
            errorMessage: "El autor debe tener al menos 3 caracteres",
        }
    ])
    .addField("#categoriaProducto", [
        {
            rule: "required",
            errorMessage: "La categoría es obligatoria",
        }
    ])
    .addField("#stock", [
        {
            rule: "required",
            errorMessage: "El stock es obligatorio",
        },
        {
            rule: 'number',
            errorMessage: "El stock debe ser un número válido",
        }
    ])
    .addField("#imgProducto", [
        {
            rule: 'files',
            value: {
                files: {
                    extensions: ['jpeg', 'jpg', 'png'],
                    maxSize: 5000000,
                    minSize: 10000,
                    types: ['image/jpeg', 'image/jpg', 'image/png'],
                },
            },
            errorMessage: "El formato de la imagen debe ser JPEG o PNG y el tamaño adecuado",
        },
    ])
    .addField("#precioProducto", [
        {
            rule: "required",
            errorMessage: "El precio es obligatorio",
        },
        {
            rule: 'number',
            errorMessage: "El precio debe ser un número válido",
        }
    ])
    .addField("#descripcionProducto", [
        {
            rule: "required",
            errorMessage: "La descripción es obligatoria",
        },
        {
            rule: "minLength",
            value: 20, 
            errorMessage: "La descripción debe tener al menos 20 caracteres",
        }
    ])
    .onSuccess((event) => {
        event.target.submit();
    });
});

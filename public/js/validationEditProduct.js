document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-edit', {
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
            errorMessage: "Nombre del producto requerido",
        },
        {
            rule: "minLength",
            value: 5,
            errorMessage: "Como mínimo el nombre debe tener 5 caracteres",
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
            errorMessage: "Categoría requerida",
        }
    ])
    .addField("#stock", [
        {
            rule: "required",
            errorMessage: "Stock requerido",
        },
        {
            rule: 'number',
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
            errorMessage: 'La imagen debe ser jpeg, jpg o png y tener un tamaño entre 10 KB y 2 MB',
        },
    ])
    .addField("#precioProducto", [
        {
            rule: "required",
            errorMessage: "Precio requerido",
        },
        {
            rule: 'number',
            errorMessage: "El precio debe ser un número válido",
        }
    ])
    .addField("#descripcionProducto", [
        {
            rule: "required",
            errorMessage: "Descripción requerida",
        },
        {
            rule: "minLength",
            value: 20,
            errorMessage: "Como mínimo la descripción debe tener 20 caracteres",
        }
    ])
    .onSuccess((event) => {
        event.target.submit();
    });
});

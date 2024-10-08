document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-edit', {
        focusInvalidField: true, 
        lockForm: true, 
    });

    validation
    .addField('#nombreProducto', [
        {
            rule: "required",
            errorMessage: "Nombre del producto requerido",
        },
        {
            rule: "minLength",
            value: 6,
            errorMessage: "Como mínimo el nombre debe tener 6 caracteres",
        }
    ])
    .addField("#categoriaProducto", [
        {
            rule: "required",
            errorMessage: "Categoria requerida",
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
            maxSize: 20000,
            minSize: 10000,
            types: ['image/jpeg', 'image/jpg', 'image/png'],
            },
        },
        },
    ])
    .addField("#precioProducto", [
        {
            rule: "required",
            errorMessage: "Precio requerido",
        },
        {
            rule: 'number',
        }
        
    ])
    .addField("#descripcionProducto", [
        {
            rule: "required",
            errorMessage: "Descripción requerida",
        },
        {
            rule: "minLength",
            value: 10,
            errorMessage: "Como mínimo la descripción debe tener 10 caracteres",
        }
    ])
    .onSuccess((event) => {
        alert("Hola, se envió");
        event.preventDefault();
    });
});

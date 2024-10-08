document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-register', {
        focusInvalidField: true, 
        lockForm: true, 
    });

    validation
    .addField("#firstName", [
        {
            rule: "required",
            errorMessage: 'Nombre requerido',
        },
        {
            rule: "minLength",
            value: 4,
            errorMessage: "Como mínimo el nombre debe tener 4 caracteres",
        }
    ])
    .addField("#apellido", [
        {
            rule: "required",
            errorMessage: "Apellido requerido",
        },
        {
            rule: "minLength",
            value: 4,
            errorMessage: "Como mínimo el apellido debe tener 4 caracteres",
        }
    ])
    .addField("#email", [
        {
            rule: "required",
            errorMessage: "Email requerido",
        },
        {
            rule: "email",
            errorMessage: "Email no válido",
        }
    ])
    .addField("#telefono", [
        {
            rule: "required",
            errorMessage: "Teléfono requerido",
        },
        {
            rule: "customRegexp",
            value: /^\+?\d{10,15}$/,
            errorMessage: "Teléfono no válido",
        }
    ])
    .addField("#contrasenia", [
        {
            rule: "required",
            errorMessage: "Contraseña requerida", 
        },
        {
            rule: "password",
            errorMessage: "La contraseña debe contener un mínimo de ocho caracteres, al menos una letra mayúscula y un número", 
        }
    ])
    .onSuccess((event) => {
        event.target.submit();
    })
});

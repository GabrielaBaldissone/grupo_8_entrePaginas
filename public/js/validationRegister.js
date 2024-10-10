document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-register', {
        errorFieldStyle: {
            borderColor: 'red'
        },
        errorFieldCssClass: 'error',
        errorLabelStyle: {
            color: 'red',
            fontSize: '16px',
        },
        lockForm: true,
        focusInvalidField: true,
    });

    validation
        .addField("#firstName", [
            {
                rule: "required",
                errorMessage: 'Nombre requerido',
            },
            {
                rule: "minLength",
                value: 2,
                errorMessage: "Como mínimo el nombre debe tener 2 caracteres",
            }
        ])
        .addField("#apellido", [
            {
                rule: "required",
                errorMessage: "Apellido requerido",
            },
            {
                rule: "minLength",
                value: 2,
                errorMessage: "Como mínimo el apellido debe tener 2 caracteres",
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
                rule: "minLength",
                value: 8,
                errorMessage: "La contraseña debe tener al menos 8 caracteres",
            },
            {
                rule: "customRegexp",
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                errorMessage: "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial", 
            }
        ])
        .onSuccess((event) => {
            event.target.submit();
        });
});

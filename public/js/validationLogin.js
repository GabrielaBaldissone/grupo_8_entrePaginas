document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-login', {
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
    .addField('#name-user', [
        {
            rule: "required",
            errorMessage: "Email requerido",
        },
        {
            rule: "email",
            errorMessage: "Email no válido",
        }
    ])
    .addField("#password-login", [
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


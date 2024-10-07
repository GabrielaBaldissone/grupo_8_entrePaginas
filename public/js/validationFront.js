document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-register', {
        focusInvalidField: true, 
        lockForm: true, 
    });

    validation
    .addField("#firstName", [
        {
            rule: "required",
            errorMessage: "Nombre requerido",
            errorMessageContainer: '#errNombre', 
        },
        {
            rule: "minLength",
            value: 4,
            errorMessage: "Como mínimo el nombre debe tener 4 caracteres",
            errorMessageContainer: "#errNombre",
        }
    ])
    .addField("#apellido", [
        {
            rule: "required",
            errorMessage: "Apellido requerido",
            errorMessageContainer: "#errApellido", 
        }
    ])
    .addField("#email", [
        {
            rule: "required",
            errorMessage: "Email requerido",
            errorMessageContainer: "#errEmail", 
        },
        {
            rule: "email",
            errorMessage: "Email no válido",
            errorMessageContainer: "#errEmail", 
        }
    ])
    .onSuccess((event) => {
        alert("Hola, se envió");
        event.preventDefault();
    });
});

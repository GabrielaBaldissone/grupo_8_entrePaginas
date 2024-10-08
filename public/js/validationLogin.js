document.addEventListener("DOMContentLoaded", function() {
    const validation = new JustValidate('#form-login', {
        focusInvalidField: true, 
        lockForm: true, 
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
    // .addField("#apellido", [
    //     {
    //         rule: "required",
    //         errorMessage: "Apellido requerido",
    //         errorMessageContainer: "#errApellido", 
    //     }
    // ])
    .onSuccess((event) => {
        alert("Hola, se envió");
        event.preventDefault();
    });
});


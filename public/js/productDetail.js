const $ = (e) => document.getElementById(e);
const stock = $("disponibilidad");
const btnAddCart = $("btnAddCart");
const btnMas = $("btnMas");
const btnMenos = $("btnMenos");
const cantidad = $("cantidad");
const lblCantidad = $("lblCantidad");

// Función para habilitar/deshabilitar botón de agregar al carrito
const habilitar = () => {
    if (stock.textContent === "Sin Stock") {
        btnAddCart.style.display = "none";
        btnMas.style.display = "none";
        btnMenos.style.display = "none";
        cantidad.style.display = "none";
        lblCantidad.style.display = "none";
    }
}

// Función para incrementar la cantidad
btnMas.addEventListener('click', (event) => {
    event.preventDefault();
    const currentValue = parseInt(cantidad.value, 10);
    cantidad.value = currentValue + 1;
});

// Función para decrementar la cantidad
btnMenos.addEventListener('click', (event) => {
    event.preventDefault();
    const currentValue = parseInt(cantidad.value, 10);
    if (currentValue > 1) {
        cantidad.value = currentValue - 1;
    }
});

habilitar();

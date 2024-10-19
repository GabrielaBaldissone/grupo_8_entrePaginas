const $ = (e)=> document.getElementById(e);
const stock = $("disponibilidad");
const btnAddCart = $("btnAddCart");

const habilitar = () =>{
    if(stock.textContent == "Sin Stock"){
        btnAddCart.style.display = "none"
    }
}


habilitar();
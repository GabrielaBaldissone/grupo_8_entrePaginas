const Product = require("../models/Product");

const datos = {
    activar: false
}

const indexController = {
    products: null,
    index: (req, res) => {
        this.products = Product.findAll();
        const sabanas = this.products.filter(prod => prod.category === "sábanas");
        const acolchados = this.products.filter(prod => prod.category === "acolchados");
        const cortinas = this.products.filter(prod => prod.category === "cortinas");
        const velas = this.products.filter(prod => prod.category === "velas");
        const esencias = this.products.filter(prod => prod.category === "esencias");
        res.render("index", {datos, sabanas, acolchados, cortinas, velas, esencias});
    }
};

module.exports = indexController;
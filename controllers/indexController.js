const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const datos = {
    activar: false
}

const indexController = {
    index: (req, res) => {
        const sabanas = products.filter(prod => prod.category === "sábanas");
        const acolchados = products.filter(prod => prod.category === "acolchados");
        const cortinas = products.filter(prod => prod.category === "cortinas");
        const velas = products.filter(prod => prod.category === "velas");
        const esencias = products.filter(prod => prod.category === "esencias");
        res.render("index", {datos, sabanas, acolchados, cortinas, velas, esencias});
        // res.render("index", {'datos': datos});
    }
};

module.exports = indexController;
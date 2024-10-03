const db = require('../database/models')

const datos = {
    activar: false
}

const indexController = {
    index: (req, res) => {
        db.Product.findAll()
        .then((productData) => {

        const sabanas = productData.filter(prod => prod.id_category === 1);
        const acolchados = productData.filter(prod =>prod.id_category === 2);
        const cortinas = productData.filter(prod => prod.id_category=== 3);
        const velas = productData.filter(prod => prod.id_category === 4);
        const esencias = productData.filter(prod => prod.id_category === 5);

        res.render("index", {datos, sabanas, acolchados, cortinas, velas, esencias});


        })

    }   

};

module.exports = indexController;
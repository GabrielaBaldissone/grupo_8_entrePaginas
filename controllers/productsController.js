const path = require('path');

const productsController = {
    productCart: (req, res) => {
        res.render(path.resolve('./views/products/productCart'));
    },
    productDetail: (req, res) => {
        res.render(path.resolve('./views/products/productDetail'));
    },
    productAdmin: (req, res) => {
        res.render(path.resolve('./views/products/formAdminProduct'));
    }
};

module.exports = productsController; 
const path = require('path');

const productsController = {
    productCart: (req, res) => {
        res.sendFile(path.resolve('./views/products/productCart.html'));
    },
    productDetail: (req, res) => {
        res.sendFile(path.resolve('./views/products/productDetail.html'));
    },
    productAdmin: (req, res) => {
        res.sendFile(path.resolve('./views/products/formAdminProduct.html'));
    }
};

module.exports = productsController; 
const path = require('path');

const productCartController = {
    productCart: (req, res) => {
        res.sendFile(path.resolve('./views/productCart.html'));
    }
};

module.exports = productCartController; 
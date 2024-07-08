const path = require('path');

const productDetailController = {
    productDetail: (req, res) => {
        res.sendFile(path.resolve('./views/productDetail.html'));
    }
};

module.exports = productDetailController;
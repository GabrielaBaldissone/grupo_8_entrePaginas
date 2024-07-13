const productsController = {
    productCart: (req, res) => {
        res.render("products/productCart");
    },
    productDetail: (req, res) => {
        res.render("products/productDetail");
    },
    productAdmin: (req, res) => {
        res.render("products/formAdminProduct");
    }
};

module.exports = productsController; 
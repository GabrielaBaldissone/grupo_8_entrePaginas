const datos = {
    activar: false
}

const productsController = {
    productCart: (req, res) => {
        res.render("products/productCart", {'datos': datos});
    },
    productDetail: (req, res) => {
        res.render("products/productDetail", {'datos': datos});
    },
    productAdmin: (req, res) => {
        res.render("products/formAdminProduct", {'datos': datos});
    }
};

module.exports = productsController; 
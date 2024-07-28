const { log } = require('console');
const fs = require('fs');
const path = require('path');

//products.json
const productsFilePath = path.join(__dirname, '../data/products.json');
const fileProducts = fs.readFileSync(productsFilePath, 'utf-8');
//productsCart.json
const productsCartFilePath = path.join(__dirname, '../data/productsCart.json');
const fileProductsCart = fs.readFileSync(productsCartFilePath, 'utf-8');

const datos = {
    activar: false
}

const productsController = {
    productCart: (req, res) => {
        let productsCart = [];
        if (fileProductsCart != "") {
            productsCart = JSON.parse(fileProductsCart);
        }
        res.render("products/productCart", {datos, productsCart});
    },
    productDetail: (req, res) => {
        const {id} = req.params;
        const products = JSON.parse(fileProducts);
        const product = products.find(prod => prod.id == id);
        const relatedProducts = products.filter(prod => prod.category == product.category && prod.id != product.id);
        res.render("products/productDetail", {datos, product, relatedProducts});
    },
    productAddCart: (req, res) =>{
        const {productId, quantity} = req.body;
        const products = JSON.parse(fileProducts);
        let productAdd = products.find(prod => prod.id == productId);
        productAdd = {...productAdd, quantity: parseInt(quantity)};
        let productsCart;
        if(fileProductsCart == ""){
            productsCart = [];
        }else{
            productsCart = JSON.parse(fileProductsCart);
        }
        productsCart.push(productAdd);
        const productsCartJSON = JSON.stringify(productsCart);
        fs.writeFileSync(productsCartFilePath, productsCartJSON);

        res.redirect(`/products/detail/${productId}`);
    },
    productAdmin: (req, res) => {
        res.render("products/formAdminProduct", {'datos': datos});
    },
    deleteProductById: (req, res) =>{
        const {id} = req.params;
        const oldProductsCart = JSON.parse(fileProductsCart);
        const productsCart = oldProductsCart.filter(prod => prod.id != id);
        const newProductsCartJSON = JSON.stringify(productsCart);
        fs.writeFileSync(productsCartFilePath, newProductsCartJSON);

        res.render("products/productCart", {datos, productsCart});
    },
    deleteAllProducts: (req, res) =>{
        const productsCart = [];
        const newProductsCartJSON = JSON.stringify(productsCart);
        fs.writeFileSync(productsCartFilePath, newProductsCartJSON);

        res.render("products/productCart", {datos, productsCart});
    }
};

module.exports = productsController; 
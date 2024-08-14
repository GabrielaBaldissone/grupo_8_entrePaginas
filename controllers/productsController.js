const fs = require('fs');
const path = require('path');
const Product = require("../models/Product");

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
    products: null,
    productCart: (req, res) => {
        let productsCart = [];
        if (fileProductsCart != "") {
            productsCart = JSON.parse(fileProductsCart);
        }
        res.render("products/productCart", {datos, productsCart});
    },
    productDetail: (req, res) => {
        this.products = Product.findAll();
        const {id} = req.params;
        const product = this.products.find(prod => prod.id == id);
        const relatedProducts = this.products.filter(prod => prod.category == product.category && prod.id != product.id);
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
    getProductAdmin: (req, res) => {
        const products = JSON.parse(fileProducts);
        res.render("products/formAdminProduct", {datos, products});
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
    },
    editProduct: (req, res) =>{
        const {productEditId} = req.query;
        const products = JSON.parse(fileProducts);
        const product = products.find(prod => prod.id == productEditId);
        
        res.render("products/editProduct", {datos, product});
    },
    updateProduct: (req, res) =>{
        const {id} = req.params;
        const {name, category, price, available, description} = req.body;
        const newImage = req.file ? req.file.filename : null;

        const product = {
            name,
            category,
            price,
            available: available === "true",
            description,
            image: newImage 
        }

        Product.editProduct(id, product);
        res.redirect(`/products/detail/${id}`);
    },
    destroy: (req, res) =>{
        const {productDeleteId} = req.body;
        let products = JSON.parse(fileProducts);
        const {image} = products.find(prod => prod.id == productDeleteId);
        const fileImage = path.join(__dirname, "../public/img/", image);

        const filteredProducts = products.filter(prod => prod.id != productDeleteId);
        const filteredProductsJSON = JSON.stringify(filteredProducts);
        fs.writeFileSync(productsFilePath, filteredProductsJSON);
        if(image != "default.png"){
            fs.unlinkSync(fileImage);
        }
        products = filteredProducts;

        res.render("products/formAdminProduct", {datos, products});
    },
    getCreateForm: (req, res) =>{
        res.render("products/createProduct.ejs", {datos});
    },
    createProduct: (req, res) =>{
        const {name, category, price, available, description} = req.body;
        const image = req.file ? req.file.filename : "default.png";
        let products = JSON.parse(fileProducts);
        const newProduct = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            name,
            category,
            price,
            available,
            image,
            description,
        };
        products.push(newProduct);
        const productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.render("products/formAdminProduct", {datos, products});
    }
};

module.exports = productsController; 
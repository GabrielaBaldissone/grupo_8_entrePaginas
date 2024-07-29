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
        const products = JSON.parse(fileProducts);

        products.forEach(prod =>{
            if(prod.id == id){
                prod.name = name,
                prod.category = category,
                prod.price = price,
                prod.available = available,
                prod.description = description,
                prod.image = newImage ? newImage : prod.image 
            }
        })

        const productsJSON = JSON.stringify(products);
        fs.writeFileSync(productsFilePath, productsJSON);

        res.render("products/formAdminProduct", {datos, products});
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
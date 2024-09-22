const { Association } = require('sequelize');
const db = require('../database/models')

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
        const {id} = req.params;
        db.Product.findByPk(id, { include: [{ association: 'category' }] })
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }

            return db.Product.findAll({
                where: {
                    id_category: product.id_category
                }
            }).then(relatedProducts => {
                res.render("products/productDetail", {datos, product, relatedProducts });
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
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
        res.render("products/formAdminProduct", {datos});
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
        const {id} = req.params;
        const product = db.Product.findByPk(id, {
            include: [{association: "category"}]
        })
        const categories = db.Category.findAll();
        // quede aca
        Promise.all([product, categories])
        .then(([product, categories])=>{
            console.log(product);
            console.log(categories);
            
            res.render("products/editProduct", {datos, product, categories});
        })
        
    },
    updateProduct: (req, res) =>{
        const {id} = req.params;
        const {name, category, price, stock, description} = req.body;
        const newImage = req.file ? req.file.filename : null;

        db.Product.update(
            {
                name,
                price,
                stock,
                image: newImage,
                description,
                id_category: category
            },
            {
                where:{
                    id_product: id
                }
            }
        )
        .then(()=> res.redirect(`/products/detail/${id}`))
        .catch(err =>{
            console.error(err.message);
        })
    },
    destroy: (req, res) =>{
        const {id} = req.params;
        db.Product.destroy({
            where:{
                id_product: id
            }
        })
        .then(()=> res.redirect("/"))
        .catch(err => console.error(err));
    },
    getCreateForm: (req, res) =>{
        res.render("products/createProduct.ejs", {datos});
    },
    createProduct: (req, res) =>{
        const {name, category, price, stock, description} = req.body;
        const image = req.file ? req.file.filename : "default.png";

        db.Product.create({
            name,
            price,
            stock,
            image,
            description,
            id_category: category
        })
        .then(()=>res.redirect("/products/admin"))
        .catch(err =>{
            console.error(err.message);
        })
    }
};

module.exports = productsController; 
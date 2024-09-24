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
    productAddCart: async (req, res) =>{
        const {productId, quantity} = req.body;

        console.log(productId, quantity)

        try {
            const product = await db.Product.findByPk(productId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }

            const [order_product, created] = await db.OrderProduct.findOrCreate({
                where: { id_product: product.id_product },
                defaults: { quantity: parseInt(quantity),
                    price: product.price,
                    date: new Date()
                }
            });

        if (!created) {
            order_product.quantity += parseInt(quantity);
            await order_product.save();
        }

        res.redirect(`/products/detail/${productId}`);

    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
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
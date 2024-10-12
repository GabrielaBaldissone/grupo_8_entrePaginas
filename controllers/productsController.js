const { Association } = require('sequelize');
const { validationResult } = require("express-validator");
const db = require('../database/models')
const fs = require("fs");
const path = require("path");

const datos = {
    activar: false
}

const productsController = {
    products: null,
    productCart: async (req, res) => {
        const userId = req.session.userLogged.id_user;
    
        try {
            const order = await db.Order.findOne({
                where: { id_user: userId },
                order: [['id_order', 'DESC']]
            });
    
            if (!order) {
                return res.status(404).json({ error: 'Carrito vacío, ¿quieres comprar?' });
            }
    
            const productsCart = await db.OrderProduct.findAll({
                where: { id_order: order.id_order },
                attributes: ['quantity'],
                include: [{
                    model: db.Product,
                    as: 'product',
                    attributes: ['id_product', 'name', 'price', 'stock', 'image', 'description'] 
                }]
            });
    
            res.render("products/productCart", { productsCart, datos });
        } catch (error) {
            console.error("Error al mostrar el carrito:", error);
            res.status(500).send("Error interno del servidor");
        }
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
        const userId = req.session.userLogged.id_user;

        try {

            const product = await db.Product.findByPk(productId);
            if (!product) {
                return res.status(404).send("Producto no encontrado");
            }

            const [order] = await db.Order.findOrCreate({
                where: { id_user: userId },
                defaults: {}
            });

            const [order_product, createdProduct] = await db.OrderProduct.findOrCreate({
                where: { id_order: order.id_order, id_product: product.id_product },
                defaults: { 
                    quantity: parseInt(quantity),
                    price: product.price,
                    date: new Date()
                }
            });

        if (!createdProduct) {
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
    deleteProductById: async  (req, res) =>{
        const {id} = req.params;
        const userId = req.session.userLogged.id_user;

        try {

            const order = await db.Order.findOne({
                where: { id_user: userId },
                order: [['id_order', 'DESC']]
            });

            const orderId = order.id_order;

            db.OrderProduct.destroy({
                where: {
                    id_order: orderId,
                    id_product: id
                }
            })
            
            const productsCart = await db.OrderProduct.findAll({
                where: {
                    id_order: orderId
                },
                include: [{
                    model: db.Product,
                    as: 'product',
                    attributes: ['id_product', 'name', 'price', 'stock', 'image', 'description']
                }]
            })
        
        
        res.render("products/productCart", {datos, productsCart});
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        res.status(500).send("Error interno del servidor");
    }
    },


    // ESTO ES PRODUCTOS
    editProduct: (req, res) =>{
        const {id} = req.params;
        const product = db.Product.findByPk(id, {
            include: [{association: "category"}]
        })
        const categories = db.Category.findAll();
        Promise.all([product, categories])
        .then(([product, categories])=>{
            console.log(product);
            console.log(categories);
            
            res.render("products/editProduct", {datos, product, categories, oldData: null});
        })
        
    },
    updateProduct: async (req, res) => {
        const errors = validationResult(req);
        const { id } = req.params;
    
        if (!errors.isEmpty()) {
            const product = await db.Product.findByPk(id, {
                include: [{ association: "category" }]
            });
            const categories = await db.Category.findAll();
            return res.render("products/editProduct", {
                errors: errors.mapped(),
                oldData: req.body,
                datos,
                product,
                categories
            });
        }

        const { name, category, price, stock, description } = req.body;
        let newImage = req.file ? req.file.filename : null;
    
        try {
            const product = await db.Product.findByPk(id);
        
            if (req.file.filename == "default.png") {
                newImage = product.image;
            }
            await db.Product.update(
                {
                    name,
                    price,
                    stock,
                    image: newImage,
                    description,
                    id_category: category
                },
                {
                    where: { id_product: id }
                }
            );
    
            res.redirect(`/products/detail/${id}`);
        } catch (err) {
            console.error(err.message);
            res.render("products/editProduct", {
                errors: { general: { msg: "Ocurrió un error al actualizar el producto" } },
                oldData: req.body,
                datos: {}
            });
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params;
    
        try {
            // Buscar el producto antes de eliminarlo
            const product = await db.Product.findByPk(id);
    
            // Verificar si la imagen no es 'default.png'
            if (product.image && product.image !== 'default.png') {
                const imagePath = path.join(__dirname, '../public/img', product.image);
    
                // Eliminar el archivo de imagen del servidor
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la imagen del producto:', err);
                    }
                });
            }
    
            // Eliminar el producto de la base de datos
            await db.Product.destroy({
                where: { id_product: id }
            });
    
            res.redirect("/");
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Error interno del servidor");
        }
    },
    getCreateForm: (req, res) =>{
        res.render("products/createProduct.ejs", {datos});
    },
    createProduct: async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return res.render("products/createProduct", {
                errors: errors.mapped(),
                oldData: req.body,
                datos
            });
        }
    
        const { name, category, price, stock, description } = req.body;
        const image = req.file ? req.file.filename : "default-product.png";
    
        try {
            await db.Product.create({
                name,
                price,
                stock,
                description,
                image,
                id_category: category
            });
    
            return res.redirect("/products/admin");
        } catch (error) {
            console.error(error);
            return res.render("products/create", {
                errors: { general: { msg: "Ocurrió un error al crear el producto" } },
                oldData: req.body
            });
        }
    }
};

module.exports = productsController; 
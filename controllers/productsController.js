const { Association } = require('sequelize');
const { validationResult } = require("express-validator");
const db = require('../database/models')
const sequelize = require('../database/models')
const fs = require("fs");
const path = require("path");

const datos = {
    activar: false
}

const productsController = {
    products: null,
    productCart: async (req, res) => {
        const cart = req.session.cart || [];
        res.render('products/productCart', { cart, datos });
        // const userId = req.session.userLogged.id_user;
    
        // try {
        //     const order = await db.Order.findOne({
        //         where: { id_user: userId },
        //         order: [['id_order', 'DESC']]
        //     });
    
        //     if (!order) {
        //         return res.status(404).json({ error: 'Carrito vacío, ¿quieres comprar?' });
        //     }
    
        //     const productsCart = await db.OrderProduct.findAll({
        //         where: { id_order: order.id_order },
        //         attributes: ['quantity'],
        //         include: [{
        //             model: db.Product,
        //             as: 'product',
        //             attributes: ['id_product', 'name', 'price', 'stock', 'image', 'description'] 
        //         }]
        //     });
    
        //     res.render("products/productCart", { productsCart, datos });
        // } catch (error) {
        //     console.error("Error al mostrar el carrito:", error);
        //     res.status(500).send("Error interno del servidor");
        // }
    },
    productDetail: (req, res) => {
        const { id } = req.params;
        db.Book.findByPk(id, { include: [{ association: 'category' }] })
            .then(book => {
                if (!book) {
                    return res.status(404).json({ error: 'Libro no encontrado' });
                }
                return db.Book.findAll({
                    where: {
                        id_category: book.id_category,
                        // Excluir el libro actual
                        id_book: { [db.Sequelize.Op.ne]: book.id_book }
                    },
                    limit: 4
                }).then(relatedBooks => {
                    res.render("products/productDetail", { datos, book, relatedBooks });
                });
            })
            .catch(error => {
                console.error(error);
                res.status(500).json({ error: 'Error interno del servidor' });
            });
    },
    productAll: (req, res) => {
        const { id_category } = req.params; 
        db.Book.findAll({
            where: {
                id_category: id_category
            },
            include: [{ association: 'category' }]
        })
        .then(allProduct => {
            if (allProduct.length === 0) {
                return res.status(404).json({ error: 'No se encontraron libros para esta categoría' });
            }
    
            const book = allProduct; 
            const categoryName = allProduct[0].category.category; 

            res.render("products/allProduct", {
                datos,
                book,
                allProduct,
                categoryName
            });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Error interno del servidor' });
        });
    },
    productAddCart: async (req, res) => {
        const { productId, quantity } = req.body;
        const userId = req.session.userLogged.id_user;
    
        try {
            // Buscar la orden del usuario con estado "pending"
            let order = await db.Order.findOne({
                where: { id_user: userId, status: "pending" }
            });
    
            if (!order) {
                // Crear una nueva orden si no existe una pendiente
                order = await db.Order.create({
                    id_user: userId,
                    status: "pending"
                });
            }
            req.session.order = order.id_order;
    
            // Inicializar el carrito en la sesión si no existe
            req.session.cart = req.session.cart || [];
            const cart = req.session.cart;
    
            // Buscar si el libro ya está en el carrito
            const bookIndex = cart.findIndex(item => item.prod.id_book == productId);
    
            if (bookIndex >= 0) {
                // Incrementar la cantidad si el libro ya está en el carrito
                cart[bookIndex].quantity += parseInt(quantity, 10);
            } else {
                // Añadir un nuevo libro al carrito
                const newBook = await db.Book.findByPk(productId);
                cart.push({ prod: newBook, quantity: parseInt(quantity, 10) });
            }
    
            req.session.cart = cart;
    
            // Redireccionar al carrito
            res.redirect('/products/cart');
        } catch (error) {
            console.error("Error al agregar el producto al carrito: ", error);
            res.status(500).send("Error al agregar el producto al carrito");
        }
    }
    ,
    checkout : async (req, res) => {
        const orderId = req.session.order;
        const cart = req.session.cart || [];
        const date = new Date(); // Obten la fecha actual
    
        try {
            // Crear registros en la tabla order_product
            for (let item of cart) {
                await db.OrderBook.create({
                    id_order: orderId,
                    id_book: item.prod.id_book,
                    quantity: item.quantity,
                    price: item.prod.price, // Incluye el precio
                    date: date // Incluye la fecha actual
                });
                const book = await db.Book.findByPk(item.prod.id_book);
                book.stock -= item.quantity;
                await book.save();
            }
    
            // Cambiar el estado de la orden a 'Completed'
            await db.Order.update(
                { status: 'paid' },
                { where: { id_order: orderId } }
            );
    
            // Limpiar la sesión
            req.session.cart = [];
            req.session.order = null;
    
            res.redirect('/');
        } catch (error) {
            console.error("Error al completar la compra:", error);
            res.status(500).send("Error interno del servidor");
        }
    },
    
    getProductAdmin: (req, res) => {
        res.render("products/formAdminProduct", {datos});
    },
    deleteProductById: (req, res) => {
        const { id } = req.params;
        const cart = req.session.cart || [];
    
        // Encontrar el índice del producto en el carrito
        const productIndex = cart.findIndex(item => item.prod.id_book == id);
    
        if (productIndex >= 0) {
            // Disminuir la cantidad si es mayor a 1
            if (cart[productIndex].quantity > 1) {
                cart[productIndex].quantity -= 1;
            } else {
                // Eliminar el producto del carrito si la cantidad es 1
                cart.splice(productIndex, 1);
            }
        }
    
        req.session.cart = cart;
    
        res.redirect('/products/cart');
    }
    ,


    // ESTO ES PRODUCTOS
    editProduct: (req, res) =>{
        const {id} = req.params;
        const product = db.Book.findByPk(id, {
            include: [{association: "category"}]
        })
        const categories = db.Category.findAll();
        Promise.all([product, categories])
        .then(([product, categories])=>{
            
            res.render("products/editProduct", {datos, product, categories, oldData: null});
        })
        
    },
    updateProduct: async (req, res) => {
        const errors = validationResult(req);
        const { id } = req.params;
        
        if (!errors.isEmpty()) {
            const book = await db.Book.findByPk(id, {
                include: [{ association: "category" }]
            });
            const categories = await db.Category.findAll();
            return res.render("products/editProduct", {
                errors: errors.mapped(),
                oldData: req.body,
                datos,
                book,
                categories
            });
        }

        const { name, category, price, stock, description } = req.body;
        let newImage = req.file ? req.file.filename : null;
    
        try {
            const book = await db.Book.findByPk(id);
        
            if (req.file.filename == "default.png") {
                newImage = book.image;
            }
            await db.Book.update(
                {
                    name,
                    author: "autor editado",
                    price,
                    stock,
                    image: newImage,
                    description,
                    id_category: category
                },
                {
                    where: { id_book: id }
                }
            );
    
            res.redirect(`/products/detail/${id}`);
        } catch (err) {
            console.error(err.message);
            res.render("products/editProduct", {
                errors: { general: { msg: "Ocurrió un error al actualizar el libro" } },
                oldData: req.body,
                datos: {}
            });
        }
    },
    destroy: async (req, res) => {
        const { id } = req.params;
    
        try {
            // Buscar el producto antes de eliminarlo
            const book = await db.Book.findByPk(id);
    
            // Verificar si la imagen no es 'default.png'
            if (book.image && book.image !== 'default.png') {
                const imagePath = path.join(__dirname, '../public/img', book.image);
    
                // Eliminar el archivo de imagen del servidor
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar la imagen del producto:', err);
                    }
                });
            }
    
            // Eliminar el producto de la base de datos
            await db.Book.destroy({
                where: { id_book: id }
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
            await db.Book.create({
                name,
                author: "prueba",
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
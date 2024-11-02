const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware.js");
const productsController = require("../controllers/productsController.js");
const fileValidator = require('../middlewares/fileValidatorMiddleware.js');
const productValidators = require('../validators/productValidators');

// RUTA DE PRODUCT CART
router.get('/cart', productsController.productCart);

// RUTA DE PRODUCT DETAIL
router.get('/detail/:id', adminMiddleware, productsController.productDetail);

// RUTA DE ALL PRODUCT 
router.get('/:id_category', adminMiddleware, productsController.productAll);

// RUTA DE ADMIN PARA CREAR O ACTUALIZAR PRODUCTOS
router.get('/admin', productsController.getProductAdmin);

// AGREGAR PRODUCTO AL CARRITO DE COMPRAS
router.post("/", authMiddleware, productsController.productAddCart);
router.post("/checkout", productsController.checkout);

// ELIMINAR UN PRODUCTO DEL CARRITO DE COMPRAS
router.delete("/cart/:id", productsController.deleteProductById);

// ELIMINAR PRODUCTO
router.delete("/delete/:id", productsController.destroy);

// MOSTRAR VISTA PARA EDITAR UN PRODUCTO
router.get("/edit/:id", adminMiddleware, productsController.editProduct);

// ACTUALIZAR PRODUCTO
router.put("/edit/:id", fileValidator("image", "products/edit"), productValidators, productsController.updateProduct); 

// CREAR NUEVO PRODUCTO
router.get("/create", productsController.getCreateForm);
router.post("/create", fileValidator("image", "products/create"), productValidators, productsController.createProduct);

module.exports = router;

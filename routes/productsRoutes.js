const express = require('express');
const router = express.Router();
const adminMiddleware = require("../middlewares/adminMiddleware");
const productsController = require("../controllers/productsController.js");
const upload = require("../services/fileUpload.js");

// RUTA DE PRODUCT CART
router.get('/cart', productsController.productCart);

// RUTA DE PRODUCT DETAIL
router.get('/detail/:id', adminMiddleware, productsController.productDetail);

// RUTA DE ADMIN PARA CREAR O ACTUALIZAR PRODUCTOS
router.get('/admin', productsController.getProductAdmin);

//AGREGAR PRODUCTO AL CARRITO DE COMPRAS
router.post("/", productsController.productAddCart);

// ELIMINAR UN PRODUCTO DEL CARRITO DE COMPRAS
router.delete("/cart/:id", productsController.deleteProductById);

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO DE COMPRAS
router.delete("/cart", productsController.deleteAllProducts);

// ELIMINAR PRODUCTO
router.delete("/delete/:id", productsController.destroy);

// MOSTRAR VISTA PARA EDITAR UN PRODUCTO
router.get("/edit/:id", adminMiddleware, productsController.editProduct);

// ACTUALIZAR PRODUCTO
router.put("/edit/:id", upload.single("image"),productsController.updateProduct);

// CREAR NUEVO PRODUCTO
router.get("/create", productsController.getCreateForm);
router.post("/create", upload.single("image"),productsController.createProduct);

module.exports = router;
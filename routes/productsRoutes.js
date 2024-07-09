const express = require('express');
const router = express.Router();


const productsController = require("../controllers/productsController.js");

// RUTA DE PRODUCT CART
router.get('/ProductCart', productsController.productCart);

// RUTA DE PRODUCT DETAIL
router.get('/productDetail', productsController.productDetail);

// RUTA DE ADMIN PARA CREAR O ACTUALIZAR PRODUCTOS
router.get('/admin', productsController.productAdmin);

module.exports = router;
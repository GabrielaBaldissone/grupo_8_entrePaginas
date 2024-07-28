const express = require('express');
const router = express.Router();
const path = require("node:path")
const productsController = require("../controllers/productsController.js");
const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, path.join(__dirname, "../public/img"));
    },
    filename(req, file, cb){
        const fileName = path.parse(file.originalname).name;
        const newFileName = `img-${fileName}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, newFileName);
    }
})

const upload = multer({storage});

// RUTA DE PRODUCT CART
router.get('/cart', productsController.productCart);

// RUTA DE PRODUCT DETAIL
router.get('/detail/:id', productsController.productDetail);

// RUTA DE ADMIN PARA CREAR O ACTUALIZAR PRODUCTOS
router.get('/admin', productsController.productAdmin);

//AGREGAR PRODUCTO AL CARRITO DE COMPRAS
router.post("/", productsController.productAddCart);

router.delete("/cart/:id", productsController.deleteProductById);

router.delete("/cart", productsController.deleteAllProducts);

module.exports = router;
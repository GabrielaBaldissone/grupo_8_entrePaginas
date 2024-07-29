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
router.get('/admin', productsController.getProductAdmin);

//AGREGAR PRODUCTO AL CARRITO DE COMPRAS
router.post("/", productsController.productAddCart);

// ELIMINAR UN PRODUCTO DEL CARRITO DE COMPRAS
router.delete("/cart/:id", productsController.deleteProductById);

// ELIMINAR TODOS LOS PRODUCTOS DEL CARRITO DE COMPRAS
router.delete("/cart", productsController.deleteAllProducts);

// ELIMINAR PRODUCTO
router.delete("/delete", productsController.destroy);

// MOSTRAR VISTA PARA EDITAR UN PRODUCTO
router.get("/edit", productsController.editProduct);

// ACTUALIZAR PRODUCTO
router.put("/edit/:id", upload.single("image"),productsController.updateProduct);

// CREAR NUEVO PRODUCTO
router.get("/create", productsController.getCreateForm);
router.post("/create", upload.single("image"),productsController.createProduct);

module.exports = router;
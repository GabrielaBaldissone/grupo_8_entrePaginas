// VARIABLES REQUIRIENDO LO NECESARIO.
const express = require('express');
const path = require('path');
const app = express();

app.set("view engine", "ejs");

// SERVIDOR.
let PORT = process.env.PORT ?? 3030;

app.listen(PORT, (err)=>{
    console.log(
        err
        ? "No se pudo levantar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
})

// PUBLIC.
const publicPath = path.resolve('public');
app.use(express.static(publicPath));

// RUTA INDEX.
const rutaIndex = require('./router/rutaIndex');
app.use("/", rutaIndex);

// RUTA LOGIN.
const rutaLogin = require('./router/rutaLogin.js');
app.use("/login", rutaLogin);

// RUTA PRODUCT CART.
const rutaProductCart = require('./router/rutaProductCart.js');
app.use("/ProductCart", rutaProductCart);

// RUTA PRODUCT DETAIL.
const rutaProductDetail = require('./router/rutaProductDetail.js');
app.use("/productDetail", rutaProductDetail);

// RUTA REGISTER.
const rutaRegister = require('./router/rutaRegister.js');
app.use("/register", rutaRegister);

//RUTA ADMIN
const rutaAdmin = require("./router/rutaAdmin.js");
app.use("/admin", rutaAdmin);
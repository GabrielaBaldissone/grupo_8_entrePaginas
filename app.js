// VARIABLES REQUIRIENDO LO NECESARIO.
const express = require('express');
const path = require('path');
const app = express();

// SERVIDOR.
let port =  3030 || process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor corriendo con éxito en puerto ${port}`)
});

// PUBLIC.
const publicPath = path.resolve(__dirname, 'public');
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
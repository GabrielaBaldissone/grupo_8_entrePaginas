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

// REQUIRIENDO RUTAS 
const indexRoutes = require('./routes/indexRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');

// RUTA INDEX.
app.use("/", indexRoutes);

// RUTA LOGIN.
app.use("/", usersRoutes);

// RUTA REGISTER.
app.use("/", usersRoutes);

// RUTA PRODUCT CART.
app.use("/", productsRoutes);

// RUTA PRODUCT DETAIL.
app.use("/", productsRoutes);

// RUTA ADMIN
app.use("/", productsRoutes);
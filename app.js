// VARIABLES REQUIRIENDO LO NECESARIO.
const express = require('express');
const app = express();

// SERVIDOR.
const PORT = process.env.PORT ?? 8080;

// PUBLIC.
app.use(express.static("public"));

// VISTAS EJS
app.set("view engine", "ejs");

// REQUIRIENDO RUTAS 
const indexRoutes = require('./routes/indexRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');

// CAPTURAR DATOS DE UN FORMULARIO EN FORMATO JSON
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// METHOD-OVERRIDE PARA IMPLEMENTAR PUT Y DELETE
const methodOverride = require("method-override");
app.use(methodOverride("_method"));


// RUTA INDEX.
app.use("/", indexRoutes);

// RUTA LOGIN Y REGISTER
app.use("/users", usersRoutes);

// RUTA PRODUCT.
app.use("/products", productsRoutes);


app.listen(PORT, (err)=>{
    console.log(
        err
        ? "No se pudo levantar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
})
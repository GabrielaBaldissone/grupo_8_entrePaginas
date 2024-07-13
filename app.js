// VARIABLES REQUIRIENDO LO NECESARIO.
const express = require('express');
const app = express();

// REQUIRIENDO RUTAS 
const indexRoutes = require('./routes/indexRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');

app.set("view engine", "ejs");

// PUBLIC.
app.use(express.static("public"));

// SERVIDOR.
const PORT = process.env.PORT ?? 3030;

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
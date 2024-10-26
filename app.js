// VARIABLES REQUIRIENDO LO NECESARIO.
const express = require('express');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");
const adminMiddlewareApp = require("./middlewares/adminMiddlewareApp");
const app = express();

// SERVIDOR.
const PORT = process.env.PORT ?? 8080;

app.use(session({
    secret: "Shh, It is a secret"
}));

app.use(cookieParser());

// // MiddleWare para pasar la session a las vistas
app.use(userLoggedMiddleware);
app.use(adminMiddlewareApp);

// PUBLIC.
app.use(express.static("public"));

// VISTAS EJS
app.set("view engine", "ejs");

// REQUIRIENDO RUTAS 
const indexRoutes = require('./routes/indexRoutes.js');
const usersRoutes = require('./routes/usersRoutes.js');
const productsRoutes = require('./routes/productsRoutes.js');
// REQUIRIENDO RUTAS DE APIs
const productsApiRoutes = require("./routes/api/productsApiRoutes.js");
const usersApiController = require("./routes/api/usersApiRoutes.js");

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

// RUTAS APIs
app.use("/api/products", productsApiRoutes);
app.use("/api/users", usersApiController);


app.listen(PORT, (err)=>{
    console.log(
        err
        ? "No se pudo levantar el servidor"
        : `Servidor levantado en http://localhost:${PORT}`
    );
})
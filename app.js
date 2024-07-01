const express = require('express');
const path = require('path');
const app = express();

let port =  3030 || process.env.PORT

const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/index.html'));
});

app.get("/ProductCart.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/ProductCart.html'));
});

app.get("/productDetail.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/productDetail.html'));
});
app.get("/register.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/register.html'));
});
app.get("/login.html", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views/login.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo con éxito en puerto ${port}`)
});
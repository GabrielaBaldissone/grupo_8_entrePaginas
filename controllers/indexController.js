const datos = {
    activar: false
}

const indexController = {
index: (req, res) => {
res.render("index", {'datos': datos});
}
};

module.exports = indexController;
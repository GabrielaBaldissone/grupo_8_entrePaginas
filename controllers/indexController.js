const db = require('../database/models')

const datos = {
    activar: false
}

const indexController = {
    index: (req, res) => {
        db.Book.findAll()
        .then((bookData) => {

        const programacion = bookData.filter(book => book.id_category === 1);
        const economia = bookData.filter(book =>book.id_category === 2);
        const psicologia = bookData.filter(book => book.id_category=== 3);
        const ficcion = bookData.filter(book => book.id_category === 4);
        const educacion = bookData.filter(book => book.id_category === 5);

        res.render("index", {datos, programacion, economia, psicologia, ficcion, educacion});


        })

    }   

};

module.exports = indexController;
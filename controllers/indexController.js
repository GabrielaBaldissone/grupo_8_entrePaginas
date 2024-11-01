const db = require('../database/models')

const datos = {
    activar: false
}

const indexController = {
    index: (req, res) => {
        db.Book.findAll()
        .then((bookData) => {

        const programacion = bookData.filter(book => book.id_category === 1).slice(0, 3);
        const economia = bookData.filter(book =>book.id_category === 2).slice(0, 3);
        const psicologia = bookData.filter(book => book.id_category=== 3).slice(0, 3);
        const ficcion = bookData.filter(book => book.id_category === 4).slice(0, 3);
        const educacion = bookData.filter(book => book.id_category === 5).slice(0, 3);

        res.render("index", {datos, programacion, economia, psicologia, ficcion, educacion});


        })

    }   

};

module.exports = indexController;
const db = require("../../database/models");

const productsApiController = {
    list: async (req, res) =>{
        try{
            //Cantidad de productos
            const count = await db.Book.count();
            // Cantidad de productos por categoria
            const categories = await db.Category.findAll();
            const countByCategory = {};
            for(const category of categories){
                const categoryName = category.category;
                const categoryId = category.id_category;
                const categoryCount = await db.Book.count({ where: { id_category: categoryId } });
                countByCategory[categoryName] = categoryCount;
            }
            // Arreglo de productos con id, name, description y url
            const products = await db.Book.findAll({
                attributes: ['id_book', 'name', 'description', 'author'],
                include: [{ association: 'category' }]
            });

            const productsArray = products.map(book => {
                const detailUrl = `/api/products/${book.id_book}`;
                return {
                    id: book.id_book,
                    name: book.name,
                    author: book.author,
                    description: book.description,
                    category: book.category.category,
                    detail: detailUrl
                };
            });

            const lastBook = await db.Book.findOne({
                order: [['id_book', 'DESC']],
                include: [{association: 'category'}]
            });
                
            return res.status(200).json({count, countByCategory, lastBook, productsArray});
        } catch(error){
            console.log("Error al obtener los libros: ", error);
        }
    },
    detail: async (req, res)=>{
        try{
            const {id} = req.params;
            const product = await db.Book.findByPk(id, { include: [{ association: 'category' }] });
            if(!product){
                return res.status(404).json({ error: "El libro no existe"});
            }
            product.image = `/img/${product.image}`;
            return res.status(200).json({product});
        } catch(error){
            console.log("Error al obtener el libro: ", error);
        }




    }
};

module.exports = productsApiController;
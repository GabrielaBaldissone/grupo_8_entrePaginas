module.exports = (sequelize, DataTypes) => {

    const alias = 'Book';
    const cols = {
        id_book: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        author:{
            type: DataTypes.STRING(255),
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10.2),
            allowNull: false
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

    const config = {
        tableName: 'books',
        timestamps: false
    }

    const Book = sequelize.define(alias, cols, config);

    Book.associate = function(models) {
        Book.belongsTo(models.Category, {
            as: "category",
            foreignKey: "id_category"
        }),
        Book.hasMany(models.OrderBook, {
            as: "order_book",
            foreignKey: "id_book"
        })
        

    }

    return Book;

}
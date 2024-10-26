module.exports = (sequelize, DataTypes) => {

    const alias = 'OrderBook';
    const cols = {
        id_order_book: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10.2),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        id_book: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Book', 
                key: 'id_book' 
            }
        },
        id_order: { 
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id_order' 
            }
        }
    }

    const config = {
        tableName: 'order_book',
        timestamps: false //probando en false por el momento
    }

    const OrderBook = sequelize.define(alias, cols, config);

    OrderBook.associate = function(models) {
        OrderBook.belongsTo(models.Book, {
            as: "book",
            foreignKey: "id_book"
        }),
        OrderBook.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "id_order"
        })
    }

    return OrderBook;

}
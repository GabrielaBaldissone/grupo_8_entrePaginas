module.exports = (sequelize, DataTypes) => {

    const alias = 'OrderProduct';
    const cols = {
        id_order_product: {
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
        id_product: { // Foreign key
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product', // Nombre del modelo relacionado
                key: 'id_product' // Columna en el modelo Product
            }
        }
    }

    const config = {
        tableName: 'order_product',
        timestamps: false //probando en false por el momento
    }

    const OrderProduct = sequelize.define(alias, cols, config);

    OrderProduct.associate = function(models) {
        OrderProduct.hasMany(models.OrderProduct, {
            as: "product",
            foreignKey: "id_product"
        }),
        OrderProduct.hasMany(models.Order, {
            as: "orders",
            foreignKey: "id_order"
        })
    }

    return OrderProduct;

}
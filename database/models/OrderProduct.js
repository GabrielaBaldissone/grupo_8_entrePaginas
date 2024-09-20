module.exports = (sequelize, DataType) => {

    const alias = 'OrderProduct';
    const cols = {
        id_order_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantify: {
            type: DataType.INTERGER,
            allowNull: false
        },
        price: {
            type: DataType.DECIMAL(10.2),
            allowNull: false
        },
        date: {
            type: DataType.DATE,
            allowNull: false
        }

    }

    const config = {
        tableName: 'order_product',
        timestamps: true
    }

    const OrderProduct = sequelize.define(alias, cols, config);

    OrderProduct.associate = function(models) {
        OrderProduct.hasMany(models.OrderProduct, {
            as: "product",
            foreingKey: "id_product"
        })
    }

    return OrderProduct;

}
module.exports = (sequelize, DataTypes) => {

    const alias = 'OrderProduct';
    const cols = {
        id_order_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        quantify: {
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
            foreignKey: "id_product"
        }),
        OrderProduct.hasMany(models.Order, {
            as: "orders",
            foreignKey: "id_order"
        })
    }

    return OrderProduct;

}
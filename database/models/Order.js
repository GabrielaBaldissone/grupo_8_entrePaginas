module.exports = (sequelize, DataType) => {

    const alias = 'Order';
    const cols = {
        id_order: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        }

    }

    const config = {
        tableName: 'orders',
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.belongsTo(models.OrderProduct, {
            as: "order_product",
            foreingKey: "id_order"
        })
    }

    return Order;

}
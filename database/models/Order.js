module.exports = (sequelize, DataTypes) => {

    const alias = 'Order';
    const cols = {
        id_order: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        status:{
            type: DataTypes.ENUM('paid', 'pending'),
            allowNull: false
        }

    }

    const config = {
        tableName: 'orders',
        timestamps: false
    }

    const Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.belongsTo(models.OrderBook, {
            as: "order_book",
            foreignKey: "id_order"
        }),
        Order.belongsTo(models.User, {
            as: "users",
            foreignKey: "id_user"
        })
    }

    return Order;

}
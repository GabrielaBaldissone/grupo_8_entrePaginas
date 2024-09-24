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
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Product', 
                key: 'id_product' 
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
        tableName: 'order_product',
        timestamps: false //probando en false por el momento
    }

    const OrderProduct = sequelize.define(alias, cols, config);

    OrderProduct.associate = function(models) {
        OrderProduct.belongsTo(models.Product, {
            as: "product",
            foreignKey: "id_product"
        }),
        OrderProduct.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "id_order"
        })
    }

    return OrderProduct;

}
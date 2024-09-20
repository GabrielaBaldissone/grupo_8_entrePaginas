module.exports = (sequelize, DataType) => {

    const alias = 'Product';
    const cols = {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING(255),
            allowNull: false

        },
        price: {
            type: DataType.DECIMAL(10.2),
            allowNull: false
        },
        stock:{
            type: DataType.INTEGER,
            allowNull: false
        },
        image: {
            type: DataType.LONGBLOB
        },
        description: {
            type: DataType.TEXT
        }

    }

    const config = {
        tableName: 'products',
        timestamps: false
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreingKey: "id_category"
        }),
        Product.belongsTo(models.OrderProduct, {
            as: "order_product",
            foreingKey: "id_product"
        })
        

    }

    return Product;

}
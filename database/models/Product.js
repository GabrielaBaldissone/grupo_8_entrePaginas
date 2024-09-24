module.exports = (sequelize, DataTypes) => {

    const alias = 'Product';
    const cols = {
        id_product: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
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
        },
        image: {
            type: DataTypes.BLOB
        },
        description: {
            type: DataTypes.TEXT
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
            foreignKey: "id_category"
        }),
        Product.hasMany(models.OrderProduct, {
            as: "order_product",
            foreignKey: "id_product"
        })
        

    }

    return Product;

}
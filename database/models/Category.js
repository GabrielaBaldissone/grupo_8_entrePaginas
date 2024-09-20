module.exports = (sequelize, DataType) => {

    const alias = 'Category';
    const cols = {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: DataType.STRING(255),
            allowNull: false
        }

    }

    const config = {
        tableName: 'categories',
        timestamps: false
    }

    const Category = sequelize.define(alias, cols, config);

    
    Category.associate = function(models) {
        Category.hasMany(models.Product, {
            as: "product",
            foreingKey: "id_category"
        })
    }

    return Category;

}
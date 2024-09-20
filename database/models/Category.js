module.exports = (sequelize, DataTypes) => {

    const alias = 'Category';
    const cols = {
        id_category: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category: {
            type: DataTypes.STRING(255),
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
            foreignKey: "id_category"
        })
    }

    return Category;

}
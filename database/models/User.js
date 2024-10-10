module.exports = (sequelize, DataTypes) => {

    const alias = 'User';
    const cols = {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING(50)
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255)
        }

    }

    const config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Order, {
            as: "order",
            foreignKey: "id_user"
        })       

    }

    return User;

}
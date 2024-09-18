module.exports = (sequelize, DataType) => {

    const alias = 'User';
    const cols = {
        id_user: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        last_name: {
            type: DataType.STRING(255),
            allowNull: false
        },
        email: {
            type: DataType.STRING(255),
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataType.STRING(50)
        },
        password: {
            type: DataType.STRING(255),
            allowNull: false
        },
        rol: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: false
        }

    }

    const config = {
        tableName: 'users',
        timestamps: false
    }

    const User = sequelize.define(alias, cols, config);

    return User;

}
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Auth extends Model {
}

Auth.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Users',
    }
);

module.exports = Auth;
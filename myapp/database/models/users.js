'use strict';
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        rol: DataTypes.INTEGER,
    }, {
        tableName: "users"
    });

    return User;

}
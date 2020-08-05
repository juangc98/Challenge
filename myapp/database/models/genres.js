'use strict';
module.exports = (sequelize, DataTypes) => {

    const Genre = sequelize.define('Genre', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        ranking: DataTypes.INTEGER,
        active: DataTypes.INTEGER,
    }, {
        tableName: "genres"
    });

    Genre.associate = function (models) {
        Genre.hasMany(models.Movie, {
            as: "movies",
            foreignKey: "genre_id"
        })
    }


    return Genre;

}
'use strict';
module.exports = (sequelize, DataTypes) => {
    
    const Movie = sequelize.define('Movie', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
        awards: DataTypes.INTEGER,
        releaseDate: DataTypes.DATE,
        length: DataTypes.INTEGER,    
    }, {tableName: "movies"});

    Movie.associate = function(models) {

        Movie.belongsTo(models.Genre, {
            as: "genre",
            foreignKey:"genre_id"
        })

        Movie.hasMany(models.Actor, {
            as: "fans",
            foreignKey: "favorite_movie_id"
        })

        Movie.belongsToMany(models.Actor, {
            as: "actors",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
        })
    }


    return Movie;

}
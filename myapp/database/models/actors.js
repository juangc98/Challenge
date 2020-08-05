'use strict';
module.exports = (sequelize, DataTypes) => {

    const Actor = sequelize.define('Actor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        rating: DataTypes.DECIMAL,
    }, {
        tableName: "actors"
    });

    Actor.associate = function (models) {

        Actor.belongsToMany(models.Movie, {
            as: "movies",
            through: "actor_movie",
            foreignKey: "actor_id",
            otherKey: "movie_id",
        })

        Actor.belongsTo(models.Movie, {
            as: "favoriteMovie",
            foreignKey: "favorite_movie_id"
        })
    }


    return Actor;

}
const db = require('../database/models/index');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const express = require('express');
const app = express();

const mainController = {

    index: function(req, res) {
        db.Movie.findAll({
            include: ["genre"]
        })
        .then(function(all){
            return res.render('index', { all })
        })
        .catch(e => console.log(e));
    },

    formNew: function(req, res) {
        db.Genre.findAll()
        .then(function(allGenres){
            return res.render('createForm', {allGenres});
        })
        .catch (e => console.log(e));
        
    },

    create: function(req, res) {

        let newMovie = req.body;

        db.Movie.create(newMovie)
            .then((newOne) => {
                let movieId = newOne.id;
                return res.redirect('/movie/' + movieId);
            })
            .catch(error => console.log(error))
    },

    show: function(req, res) {
        let myMovie;
        let myId = req.params.id;
        db.Movie.findByPk(myId, {
            include: ["actors", "genre"]
        })
        .then(function(foundMovie){
            myMovie = foundMovie;
            db.Genre.findAll()
                .then(function (allGenres) {
                    return res.render('detail', {
                        myMovie,
                        allGenres
                    });
                })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));

    },

    delete: function(req, res) {

        let movieId = req.body.movieId;

        db.Movie.findByPk(movieId)
        .then(() =>{
            db.Movie.destroy({
                where: {
                    id: movieId
                }
            })
        })
        .then(()=>{
            return res.redirect("/");
        })
        .catch(e => console.log(e));

    },

    edit: function(req, res) {

        let movieId = req.body.movieId;

        let newData = req.body;

        db.Movie.update(
            newData, {
                where: {id: movieId}
            }
        )
        .then(()=> { return res.redirect("/movie/" + movieId)})
        .catch(e => console.log(e));
    },

    search: function(req, res) {

        let myQuery = req.query.buscar;

        db.Genre.findAll({
            where: {
                name: {
                    [Op.startsWith]: myQuery
                }
            }
        })
        .then((genreResult) => {
            let myGenres = genreResult;
            db.Movie.findAll({
                    where: {
                        title: {
                            [Op.startsWith]: myQuery
                        }
                    },
                    order: [
                        ['title', 'DESC']
                    ],
                })
                .then((specific) => {
                    let mySearch = specific;
                    db.Movie.findAll({
                            where: {
                                title: {
                                    [Op.substring]: myQuery
                                }
                            },
                            order: [
                                ['title', 'DESC']
                            ],
                        })
                        .then((moreResults) => {
                            let extraSearch = moreResults;

                            return res.render('search', {
                                myGenres,
                                mySearch,
                                extraSearch 
                            })
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

}

module.exports = mainController;
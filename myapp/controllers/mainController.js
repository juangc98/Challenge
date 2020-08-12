const db = require('../database/models/index');
const Op = db.Sequelize.Op;
const {validationResult} = require('express-validator');

const mainController = {

    index: function(req, res) {
        db.Movie.findAll({
            include: ["genre"]
        })
        .then(function(all){
            //return res.send(all)
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

        const errors = validationResult(req);
        
        if(errors.isEmpty()) {
            let newMovie = req.body;
            db.Movie.create(newMovie)
                .then((newOne) => {
                    let movieId = newOne.id;
                    return res.redirect('/movie/' + movieId);
                })
                .catch(error => console.log(error))
        } else {
            db.Genre.findAll()
                .then(function (allGenres) {
                    return res.render('createForm', {
                        errors: errors.mapped(),
                        old: req.body,
                        allGenres
                    })
                })
                .catch(e => console.log(e));
            }
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

        const errors = validationResult(req);
        let movieId = req.body.movieId;
        let newData = req.body;

        if (errors.isEmpty()) {       
            db.Movie.update(
                newData, {
                    where: {id: movieId}
                }
            )
            .then(()=> { return res.redirect("/movie/" + movieId)})
            .catch(e => console.log(e));
        } else {
            db.Movie.findByPk(movieId, {
                    include: ["actors", "genre"]
                })
                .then(function (foundMovie) {
                    myMovie = foundMovie;
                    db.Genre.findAll()
                        .then(function (allGenres) {
                            return res.render('detail', {
                                myMovie,
                                allGenres,
                                errors: errors.mapped(),
                                old: newData
                            });
                        })
                        .catch(e => console.log(e));
                })
                .catch(e => console.log(e));
        }
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
    },

    genre: function(req, res) {

        let myGenre;
        let myId = req.params.id;

        db.Genre.findByPk(myId, {
                include: ["movies"]
            })
            .then(function (foundGenre) {
                myGenre = foundGenre;
                return res.render('genre', {
                    myGenre
                });
            })
            .catch(e => console.log(e));

    },

    actor: function(req, res) {
        let myActor;
        let myId = req.params.id;

        db.Actor.findByPk(myId, {
            include: ["movies", "favoriteMovie"]
        })
        .then(function (foundActor) {
            myActor = foundActor;
            return res.render('actor', {
                myActor
            });
        })
        .catch(e => console.log(e));
    },

    ranking: function (req, res) {

        db.Movie.findAll({
            limit: 10,
            order: [['rating', 'DESC']],
            include: ["genre"]
            })
            .then(function (all) {
                //return res.send(all)
                return res.render('ranking', {
                    all
                })
            })
            .catch(e => console.log(e));

    },

    premieres: function (req, res) {

        db.Movie.findAll({
                limit: 10,
                order: [
                    ['releaseDate', 'DESC']
                ],
                include: ["genre"]
            })
            .then(function (all) {
                //return res.send(all)
                return res.render('premieres', {
                    all
                })
            })
            .catch(e => console.log(e));

    }





}

module.exports = mainController;
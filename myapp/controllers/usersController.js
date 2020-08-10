const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const db = require('../database/models/index');


const usersController = {

    register: function (req, res) {
        return res.render('register');
    },

    processRegister: function (req, res) {

        const errors = validationResult(req);

        if (errors.isEmpty()) {
            let newUser = req.body
            newUser.password = bcryptjs.hashSync(newUser.password, 10);
            delete newUser.password2;
            db.User.create(newUser)
                .then(() => {
                    return res.redirect('/users/login');
                })
                .catch((error) => { console.log(error)});
        } else {
            return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    login: function (req, res) {
        return res.render('login');
    },

    processLogin: function (req, res) {

        db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(user => {
             if (user) {
                 if (bcryptjs.compareSync(req.body.password, user.password)) {
                     let userSession = user;
                     delete userSession.dataValues.password;
                     req.session.user = userSession;
                     if (req.body.recordame) {
                         res.cookie("id", userSession.id, {
                             maxAge: 1000 * 60 * 60 * 24
                         })
                     }
                     //console.log(req.session.user);
                     return res.redirect('/');
                 } else {
                     return res.render('login', {
                         error: 'Usuario y/o contraseña no coinciden'
                     })
                 }
             } else {
                 return res.render('login', { error: 'Usuario y/o contraseña no coinciden'})
             }
             })
      },

        logout: function (req, res) {

            req.session.destroy();

            if (req.cookies.id) {
                res.clearCookie("id");
            }

            return res.redirect('/')
        }
}

module.exports = usersController;
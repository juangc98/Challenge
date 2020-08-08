const path = require('path');
const { body } = require('express-validator');
const db = require('../database/models/')
const Op = db.Sequelize.Op
const User = db.User;

module.exports = {

    register: [

        body('email')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isEmail().withMessage('Debes ingresar un email válido').bail()
        .custom(value => {
            return User.findOne({
                    where: {
                        email: value
                    }
                })
                .then(user => {
                    if (user) {
                        return Promise.reject('El email ya está registrado')
                    }
                })
        }),

        body('password')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .isLength({
            min: 3
        }).withMessage('La contraseña debe tener al menos 3 caracteres'),

        body('password2')
        .notEmpty().withMessage('Campo obligatorio').bail()
        .custom((value, {
            req
        }) => req.body.password == req.body.password2).withMessage('Las contraseñas no coinciden')

    ],

    createMovie: [
        body('title')
            .notEmpty().withMessage('Campo obligatorio'),

        body('rating')
            .notEmpty().withMessage('Campo obligatorio'),

        body('awards')
            .notEmpty().withMessage('Campo obligatorio'),

        body('releaseDate')
            .notEmpty().withMessage('Campo obligatorio'),

        body('length')
            .notEmpty().withMessage('Campo obligatorio'),

        body('genre')
            .notEmpty().withMessage('Campo obligatorio'),

    ],

    editMovie: [
        body('title')
            .notEmpty().withMessage('Campo obligatorio'),

        body('rating')
            .notEmpty().withMessage('Campo obligatorio'),

        body('awards')
            .notEmpty().withMessage('Campo obligatorio'),

        body('releaseDate')
            .notEmpty().withMessage('Campo obligatorio'),

        body('length')
            .notEmpty().withMessage('Campo obligatorio'),

        body('genre_id')
            .notEmpty().withMessage('Campo obligatorio'),

    ],

}
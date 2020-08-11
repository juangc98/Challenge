const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const admin = require('../middlewares/admin');
const validator = require('../middlewares/validator');

/* HOME */
router.get('/', mainController.index);

/* Creación de nueva pelicula */
router.get('/new', admin, mainController.formNew);
router.post('/new', admin, validator.createMovie, mainController.create);

/* Detalle de pelicula */
router.get('/movie/:id', mainController.show);
router.put('/movie', admin, validator.editMovie, mainController.edit);
router.delete('/movie', admin, mainController.delete);

/* BUSQUEDA*/
router.get('/search', mainController.search);

/* by GENRE */
router.get('/bygenre/:id', mainController.genre);

/* by ACTOR */
router.get('/byactor/:id', mainController.actor);

module.exports = router;

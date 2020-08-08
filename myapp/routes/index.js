const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const admin = require('../middlewares/admin');
const validator = require('../middlewares/validator');

/* HOME PAGE */
router.get('/', mainController.index);

/* Create new movie */
router.get('/new', admin, mainController.formNew);
router.post('/new', admin, validator.createMovie, mainController.create);

/* MOVIE DETAIL */
router.get('/movie/:id', mainController.show);
router.put('/movie', admin, validator.editMovie, mainController.edit);
router.delete('/movie', admin, mainController.delete);

/* BUSQUEDA*/
router.get('/search', mainController.search);

/* GENRES */
router.get('/bygenre/:id', mainController.genre);

/* ACTORS */
router.get('/byactor/:id', mainController.actor);

module.exports = router;

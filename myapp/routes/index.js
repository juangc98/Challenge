var express = require('express');
var router = express.Router();
let mainController = require('../controllers/mainController');

/* HOME PAGE */
router.get('/', mainController.index);

/* Create new movie */
router.get('/new', mainController.formNew);
router.post('/new', mainController.create);

/* MOVIE DETAIL */
router.get('/movie/:id', mainController.show);
router.put('/movie', mainController.edit);
router.delete('/movie', mainController.delete);

module.exports = router;

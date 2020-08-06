var express = require('express');
var router = express.Router();
const usersController = require('../controllers/usersController');

/* RUTAS */
router.get('/register', usersController.register);
router.post('/register', usersController.processRegister);

router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

router.get('/logout', usersController.logout);


module.exports = router;

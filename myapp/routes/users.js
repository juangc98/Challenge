const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const validator = require('../middlewares/validator');

/* RUTAS */

// REGISTRO
router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.processRegister);

// LOGIN
router.get('/login', usersController.login);
router.post('/login', usersController.processLogin);

// LOGOUT
router.get('/logout', usersController.logout);


module.exports = router;

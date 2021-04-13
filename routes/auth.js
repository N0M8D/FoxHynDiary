const express = require('express');
const router = express.Router();
const db = require("../database");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index');
});

router.get('/login', function(req, res) {
    res.render('auth/login');
});
/*
router.get('/createuser', function(req, res) {
    console.log('show create-user page');
    res.render('auth/createuser');
});
*/
router.post('/changePassword', authController.changePassword);

router.post('/login', authController.login);

router.use('/logout', authController.checkToken, authController.logout);

//router.post('/createuser', authController.createuser);



module.exports = router;
const express = require('express');
const router = express.Router();
const db = require("../database");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData });
});

router.get('/login', function(req, res) {
    res.render('auth/login', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData });
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
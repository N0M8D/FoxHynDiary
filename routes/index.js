const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res, next) {

    console.log(req.user);
    return res.status(200).render('index', {
        info: req.flash('info'),
        error: req.flash('error'),
        message: req.flash('message')
    });
    /*
    const authcookie = req.cookies.jwt
    jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log('notloged');
            return res.status(200).render('index', {
                info: req.flash('info'),
                error: req.flash('error'),
                message: req.flash('message'),
                logedIn: false
            });
        } else if (data.id) {
            console.log('logedin');
            req.id = data.id
            return res.status(200).render('index', {
                info: req.flash('info'),
                error: req.flash('error'),
                message: req.flash('message'),
                logedIn: true
            });
        }

    });
    */
});

module.exports = router;
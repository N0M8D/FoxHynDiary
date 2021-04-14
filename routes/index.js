const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require('../controllers/auth');

/* GET home page. */
router.get('/', function(req, res) {
    return res.status(200).render('index', {
        info: req.flash('info'),
        error: req.flash('error'),
        message: req.flash('message'),
        userData: req.userData
    });
});

module.exports = router;
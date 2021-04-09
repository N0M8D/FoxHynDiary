const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");
const authController = require('../controllers/auth');

/* GET home page. */
router.get('/menu', authController.checkToken, function(req, res, next) {
    res.render('admin/menu');

});

module.exports = router;
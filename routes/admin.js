const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const adminController = require('../controllers/admin');

/* GET home page. */

router.use('/menu', authController.checkToken, adminController.loadMenu);

router.post('/saveOrCreate', adminController.saveOrCreate);
/*
router.post('/saveOrCreate', function(req, res) {
    console.log(req.body);
})
*/

module.exports = router;
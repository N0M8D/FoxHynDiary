var express = require('express');
const router = express.Router();
const mySqlSelect = require('../mysql/select');
const planyController = require('../controllers/plany');
const authController = require('../controllers/auth');
var denikController = require('../controllers/denik');


//router.use('/denik/denni', authController.checkToken, denikController.loadDenniDashboard);

//router.use('/denik/tydenni', authController.checkToken, denikController.loadTydenniDashboard);

router.use('/denik/addDenniZaznam', authController.checkToken, denikController.addDenniZaznam);

router.use('/denik/zaznamy', authController.checkToken, denikController.loadZaznamyDashboard);

router.use('/denik/chooseAdog', authController.checkToken, denikController.chooseAdog);

router.post('/denik/rozcestnik', function(req, res) {
    if (req.body.btn == "tydenni") {
        //console.log("HERE");
        denikController.loadTydenniDashboard(req, res);
    } else {
        denikController.loadDenniDashboard(req, res);
    }
})


router.use('/plany', authController.checkToken, planyController.load);

router.post('/completeGoal', authController.checkToken, planyController.finishGoal);



router.use('/profile', function(req, res, next) {
    mySqlSelect.specificUser(req, function(result) {
        mySqlSelect.dogsOfUser(req, function(dresult) {
            var data = result[0];
            res.render('pessos/profile', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData, profileData: data, dogs: dresult });
        })
    })

});


module.exports = router;
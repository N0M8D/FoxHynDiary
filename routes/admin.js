const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const adminController = require('../controllers/admin');
const { route } = require('./pessos');

/* GET home page. */

router.use('/menu', authController.checkToken, adminController.loadMenu);

router.post('/cvicitel/addBP', authController.checkToken, adminController.addBP);

router.post('/cvicitel/deleteBP', authController.checkToken, adminController.removeBP);

router.post('/cvicitel/deleteSP', authController.checkToken, adminController.removeSP);

router.post('/cvicitel/addSPforBP', authController.checkToken, adminController.addSPinBP);

router.post('/cvicitel/saveactivity', adminController.saveActivity);

router.post('/cvicitel/removeactivity', adminController.deleteActivity);

router.post('/cvicitel/addactivity', adminController.addActivity);

router.post('/cvicitel/createPlans', adminController.createPlansLoad);

router.post('/cvicitel/assign', adminController.assigneCvic);

router.post('/cvicitel/unassign', adminController.unassignCvic);

router.use('/cvicitel', authController.checkToken, adminController.loadCvicitelMenu)

router.post('/saveOrCreate', adminController.saveOrCreate);

/*
router.post('/saveOrCreate', function(req, res) {
    console.log(req.body);
})
*/

router.post('/savedog', adminController.saveDog);

router.post('/adddog', adminController.addDog);

module.exports = router;
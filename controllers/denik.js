var express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');
const mySqlUpdate = require('../mysql/update');
const mySqlDelete = require('../mysql/remove');


exports.loadDenniDashboard = function(req, res) {

    const did = 2;
    mySqlSelect.allowedActivity(did, function(callback) {

        var activities = callback[0].allowedActivity.split('|');
        activities = activities.slice(0, -1);
        //console.log(activities);
        mySqlSelect.dogsActivity(activities, function(allowedActivities) {
            console.log(allowedActivities);
            res.render('pessos/denik/denni', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData, allowedActivities });
        })
    })
}

exports.loadTydenniDashboard = function(req, res) {
    res.render('pessos/denik/tydenni', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData });
}

exports.loadZaznamyDashboard = function(req, res) {
    res.render('pessos/denik/zaznamy', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), userData: req.userData });
}
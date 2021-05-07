const express = require('express');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');
const mySqlUpdate = require('../mysql/update');
const mySqlDelete = require('../mysql/remove');
const authController = require('../controllers/auth');


exports.createPlansLoad = function(req, res) {
    mySqlSelect.bigPlansForUser(req, function(bresult) {
        mySqlSelect.smallPlansForUser(req,
            function(sresult) {
                res.render('pessos/createPlans', {
                    info: req.flash('info'),
                    error: req.flash('error'),
                    message: req.flash('message'),
                    userData: req.userData,
                    smallPlans: sresult,
                    bigPlans: bresult
                });
            })
    })
}


exports.saveActivity = (req, res) => {
    var allowedActivity = "";
    const data = req.body;
    for (var i = 0; i <= Object.keys(data).length; i++) {
        if (data['id-' + i] != undefined) {
            //console.log('AID: ' + data['id-' + i]);
            //console.log('STATUS: ' + data['allowed-' + i]);
            if (data['allowed-' + i] == "ALLOWED") {
                allowedActivity += data['id-' + i] + '|';
            }
        }

    }
    mySqlUpdate.setAllowedActivity(req, allowedActivity, function() {
            //console.log(allowedActivity)
            return res.redirect('cvicitel');
        })
        //return res.redirect('cvicitel');

}

exports.deleteActivity = (req, res) => {
    mySqlDelete.removeActivity(req, function() {
        return res.redirect('cvicitel');
    })
}

exports.addActivity = (req, res) => {
    mySqlInsert.newActivity(req, function() {
        return res.redirect('cvicitel');
    })

}

exports.unassignCvic = (req, res) => {
    mySqlUpdate.unassignCvic(req, function() {
        return res.redirect('cvicitel');
    })
}

exports.assigneCvic = (req, res) => {
    mySqlUpdate.assignCvic(req, function() {
        return res.redirect('cvicitel');
    })
}

exports.loadCvicitelMenu = async(req, res) => {
    mySqlSelect.allActivity(function(aresult) {
        mySqlSelect.fromDogsForCvicitel(function(result) {
            mySqlSelect.allCvicitels(function(cresult) {
                res.render('admin/cvicitel', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), activity: aresult, userData: req.userData, dogs: result, cvicitele: cresult });
            })
        })
    })
};


exports.saveDog = (req, res) => {

    mySqlUpdate.dogs(req, function() {
        return res.redirect('menu');
    });
}

exports.addDog = (req, res) => {
    mySqlInsert.intoDogs(req, function() {
        return res.redirect('menu');
    });
}


exports.loadMenu = async(req, res) => {
    mySqlSelect.fromDogs(function(result) {
        let dogs = result;
        mySqlSelect.fromUsers(function(result) {
            res.render('admin/menu', { info: req.flash('info'), error: req.flash('error'), message: req.flash('message'), uzivatele: result, userData: req.userData, dogs });
        })
    })
};


exports.saveOrCreate = async(req, res) => {
    //console.log(req.body);
    const email = req.body.email;

    mySqlSelect.fromUsers(function(result) {

        console.log(result);
        if (result.some(e => e.email === email)) {
            console.log('Email nalezen, ukládám tedy údaje o uživateli..')
            mySqlUpdate.user(req, function() {
                return res.redirect('menu');
            })
        } else {
            console.log('Email nenalezen, zakládám tedy nového uživatele..')
            authController.createuser(req, function() {
                req.flash('message', 'Uživatel založen');
                return res.redirect('menu')
            });
        }
    })

};
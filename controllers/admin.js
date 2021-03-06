const express = require('express');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');
const mySqlUpdate = require('../mysql/update');
const mySqlDelete = require('../mysql/remove');
const authController = require('../controllers/auth');


exports.removeBP = function(req, res) {
    mySqlDelete.removeBigPlan(req, function() {
        return res.redirect('pessos/createPlans');
    })
}

exports.removeSP = function(req, res) {
    mySqlDelete.removeSmallPlan(req, function() {
        return res.redirect('pessos/createPlans');
    })
}


exports.addLonelySP = function(req, res) {
    //nelze
}

exports.addBP = function(req, res) {
    mySqlInsert.bigPlan(req, function() {
        return res.redirect('pessos/createPlans')
    })

}

exports.addSPinBP = function(req, res) {
    mySqlInsert.spForBP(req, function() {
        return res.redirect('pessos/createPlans')
    })
}


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
                    bigPlans: bresult,
                    did: req.body.did
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
            console.log('Email nalezen, ukl??d??m tedy ??daje o u??ivateli..')
            mySqlUpdate.user(req, function() {
                return res.redirect('menu');
            })
        } else {
            console.log('Email nenalezen, zakl??d??m tedy nov??ho u??ivatele..')
            authController.createuser(req, function() {
                req.flash('message', 'U??ivatel zalo??en');
                return res.redirect('menu')
            });
        }
    })

};
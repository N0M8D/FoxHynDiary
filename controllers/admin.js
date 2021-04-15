const express = require('express');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');
const mySqlUpdate = require('../mysql/update');
const authController = require('../controllers/auth');


exports.saveDog = (req, res) => {

    mySqlUpdate.dog(req, function() {
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
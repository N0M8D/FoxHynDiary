const express = require('express');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');
const mySqlUpdate = require('../mysql/update');


exports.load = function(req, res) {
    mySqlSelect.bigPlansForUser(req, function(bresult) {
        mySqlSelect.smallPlansForUser(req, function(sresult) {
            res.render('pessos/plany', {
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
const express = require('express');
const mySqlSelect = require('../mysql/select');
const mySqlInsert = require('../mysql/insert');




exports.loadMenu = async(req, res) => {

    mySqlSelect.fromUsers(function(result) {
        res.render('admin/menu', { uzivatele: result });

    })
};


exports.saveOrCreate = async(req, res) => {
    //console.log(req.body);
    mySqlInsert.intoUsers(req, function(result) {
        return res.render('admin/menu', {
            error: "Data uložena !",
            uzivatele: result
        });
    });

};
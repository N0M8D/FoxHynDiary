const db = require("../database");


exports.unassignCvic = function(req, next) {
    const { did } = req.body;
    db.query("UPDATE dogs SET cid = '' WHERE id = ?", [
        did
    ], async(error) => {
        if (error) {
            console.log("Error..");
            console.log(error);
            req.flash('error', 'Chyba ukládání dat!');
            next();
        } else {
            console.log("Done...");
            req.flash('message', 'Cvičitel odebrán');
            next();
        }
    })
}

exports.assignCvic = function(req, next) {
    const { cid, did } = req.body;

    db.query('UPDATE dogs SET ? WHERE id = ? ', [
        { cid },
        did
    ], async(error) => {
        if (error) {
            console.log("Error..");
            console.log(error);
            req.flash('error', 'Chyba ukládání dat!');
            next();
        } else {
            console.log("Done...");
            req.flash('message', 'Cvičitel přiřazen');
            next();
        }
    })
}

exports.dogs = function(req, next) {
    const { id, name, race, born } = req.body;
    db.query('UPDATE dogs SET ? WHERE id = ?', [{
        name,
        race,
        born
    }, id], async(error) => {
        if (error) {
            console.log("Error..");
            console.log(error);
            req.flash('error', 'Chyba ukládání dat!');
            next();
        } else {
            console.log("Done...");
            req.flash('message', 'Pes upraven a uložen');
            next();
        }
    });
}

exports.user = function(req, next) {

    console.log("INSERTING DATA..");

    const { name, email, adress, tel, permissions } = req.body;
    db.query('UPDATE users SET ? WHERE email = ?', [{
        name,
        email,
        adress,
        telefon: tel,
        permissions
    }, email], async(error) => {
        if (error) {
            console.log("Error..");
            console.log(error);
            req.flash('error', 'Chyba ukládání dat!');
            next();
        } else {
            console.log("Done...");
            req.flash('message', 'Uživatel upraven a uložen');
            next();
        }
    });
}
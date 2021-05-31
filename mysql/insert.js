const db = require("../database");
const mySqlUpdate = require('../mysql/update');


exports.addDenniZaznam = function(req, next) {
    const { did, plan, activity, poznamka, date } = req.body;
    const { status } = req.body.optionsoutlined

    console.log('did: ' + did, 'plan: ' + plan, 'status: ' + req.body.optionsoutlined, 'poznamka: ' + poznamka, 'date: ' + date);

    db.query("INSERT INTO zaznamy SET ?", {
        did,
        activity,
        date,
        plan,
        status,
        text: poznamka,
        type: "denni"
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba přidávání denní aktivity');
            next();
        } else {
            req.flash('message', 'Denní aktivita uložena!');
            next();
        }
    })

}


exports.spForBP = function(req, next) {
    const { bid, name, dateend } = req.body;
    db.query('INSERT INTO plans_small SET ?', {
        bid,
        name,
        dateend,
        status: 0
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba přidávání malého plánu');
            next();
        } else {
            mySqlUpdate.addPartToBigPlan(bid, function() {
                req.flash('message', 'Malý plán založen!');
                next();
            })

        }
    });
}

exports.bigPlan = function(req, next) {
    const { did, name, dateend } = req.body;
    db.query('INSERT INTO plans_big SET ? ', {
        did,
        name,
        dateend,
        progress: 0
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba přidávání velkého plánu');
            next();
        } else {
            req.flash('message', 'Velký plán založen!');
            next();
        }
    });
}


/*
NELZE VYTVOŘIT SAMOSTATNÝ PLÁN, PROTOŽE MALEJ PLÁN BERE DID Z VELKÉHO PLÁNU
exports.addLonelySP = function(req, next) {
    const { did } = req.body;
    db.query('INSERT INTO activity SET ? ', {
        did
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba přidávání samostatného malého plánu');
            next();
        } else {
            req.flash('message', 'Samostatný malý plán přidán !');
            next();
        }
    });
}
*/
exports.newActivity = function(req, next) {
    const { name } = req.body;
    db.query('INSERT INTO activity SET ? ', {
        name
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba přidávání aktivity');
            next();
        } else {
            req.flash('message', 'Aktivita přidána !');
            next();
        }
    });
}

exports.intoDogs = function(req, next) {

    const { pid, name, race, born } = req.body;
    db.query('INSERT INTO dogs SET ? ', {
        pid,
        name,
        race,
        born
    }, async(error) => {
        if (error) {
            console.log(error);
            req.flash('error', 'Chyba zakládání psa');
            next();
        } else {
            req.flash('message', 'Pes založen !');
            next();
        }
    });

}

exports.intoUsers = function(req, callback, next) {

    console.log("INSERTING DATA:.");
    const { name, email, adress, tel, permissions } = req.body;

    db.query('INSERT INTO users SET ? ', {
        name,
        email,
        adress,
        telefon: tel,
        permissions,
        registered: new Date()
    }, async(error, results) => {
        if (error) {
            console.log(error);
        } else {
            next
        }
    });
}
const db = require("../database");




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
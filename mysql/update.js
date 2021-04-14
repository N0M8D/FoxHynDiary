const db = require("../database");



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
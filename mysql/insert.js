const db = require("../database");



exports.intoUsers = function(req, callback) {

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
            callback(results);
        }
    });
}
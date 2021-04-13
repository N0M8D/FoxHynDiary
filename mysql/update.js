const db = require("../database");



exports.user = function(req, callback) {

    console.log("INSERTING DATA..");
    const { name, email, adress, tel, permissions } = req.body;

    db.query('UPDATE users SET ? WHERE email = ?', [{
        name,
        email,
        adress,
        telefon: tel,
        permissions
    }, email], async(error, results) => {
        if (error) {
            console.log(error);
            callback("ERROR ukládání dat!!");
        } else {
            callback("Data uložena !");
        }
    });
}
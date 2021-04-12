const db = require("../database");


exports.fromUsers = function(callback) {
    db.query('SELECT * FROM users ', async(error, results) => {
        if (error) {
            console.log(error);
        } else {
            callback(results);
        }
    });
}
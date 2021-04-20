const db = require("../database");


exports.specificUser = function(req, callback) {
    db.query('SELECT id,name,email,adress,telefon,registered FROM users WHERE ? ', req.query,
        async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        });
}

exports.dogsOfUser = function(req, callback) {
    db.query('SELECT * FROM dogs WHERE ? ', { pid: req.query.id },
        async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        });
}

exports.fromDogsForCvicitel = function(callback) {
    db.query('SELECT dogs.* ,u.id AS uid, u.name AS uname, c.name AS cname FROM c1pessos.dogs ' +
        'INNER JOIN users AS u ' +
        'ON u.id = dogs.pid ' +
        'LEFT JOIN users AS c ' +
        'ON c.id = dogs.cid ', async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        })


}

exports.allCvicitels = function(callback) {
    db.query("SELECT id, name FROM users WHERE permissions = 'cvicitel' ",
        async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        });
}

exports.fromUsers = function(callback) {
    db.query('SELECT * FROM users ', async(error, results) => {
        if (error) {
            console.log(error);
        } else {
            callback(results);
        }
    });
}


exports.fromDogs = function(callback) {
    db.query('SELECT * FROM dogs ', async(error, results) => {
        if (error) {
            console.log(error);
        } else {
            callback(results);
        }
    })
}
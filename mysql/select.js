const db = require("../database");



exports.allActivity = function(callback) {
    db.query('SELECT * FROM activity ',
        async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        })
}

//PLÁNOVÁNÍ

exports.smallPlansForUser = function(req, callback) {
    db.query('SELECT plans_small.id, plans_small.bid, plans_small.name, plans_small.dateend, ' +
        'plans_big.name AS bname, dogs.name AS dname, plans_small.status ' +
        'FROM c1pessos.plans_small ' +
        'LEFT JOIN plans_big ' +
        'ON plans_small.bid = plans_big.id ' +
        'LEFT JOIN dogs ' +
        'ON did = dogs.id;', async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        })
}

exports.bigPlansForUser = function(req, callback) {
    db.query('SELECT plans_big.id, plans_big.name, plans_big.dateend, ' +
        'dogs.name AS dname, plans_big.progress ' +
        'FROM c1pessos.plans_big ' +
        'LEFT JOIN dogs ' +
        'ON did = dogs.id;', async(error, results) => {
            if (error) {
                console.log(error);
            } else {
                callback(results);
            }
        })
}




//PLÁNOVÁNÍ


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
    db.query('SELECT dogs.* ,u.id AS uid, u.name AS uname, c.name AS cname, dogs.allowedActivity FROM c1pessos.dogs ' +
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
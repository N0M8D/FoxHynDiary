const db = require("../database");

exports.removeBigPlan = function(req, next) {
    const { id } = req.body;
    db.query('DELETE FROM plans_big WHERE ? ', {
            id
        },
        async(error) => {
            if (error) {
                console.log(error);
                req.flash('error', error);
                next();
            } else {
                db.query('DELETE FROM plans_small WHERE bid = ? ',
                    id,
                    async(error) => {
                        if (error) {
                            console.log(error);
                            req.flash('error', error);
                            next();
                        } else {
                            req.flash('message', 'Vělký plán odstraněn !');
                            next();
                        }
                    })
            }
        })
}

exports.removeSmallPlan = function(req, next) {
    const { id } = req.body;
    db.query('DELETE FROM plans_small WHERE ? ', {
            id
        },
        async(error) => {
            if (error) {
                console.log(error);
                req.flash('error', error);
                next();
            } else {
                req.flash('message', 'Malý plán odstraněn !');
                next();
            }
        })
}




exports.removeActivity = function(req, next) {
    const { id } = req.body;
    db.query('DELETE FROM activity WHERE ? ', {
            id
        },
        async(error, results) => {
            if (error) {
                console.log(error);
                req.flash('error', error);
                next();
            } else {
                req.flash('message', 'Aktivita odstraněna !');
                next();
            }
        })
}
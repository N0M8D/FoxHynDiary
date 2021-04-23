const db = require("../database");

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
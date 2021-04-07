var express = require('express');
const router = express.Router();




router.get('/denik/denni', function(req, res, next) {
    res.render('pessos/denik/denni');

});
router.get('/denik/tydenni', function(req, res, next) {
    res.render('pessos/denik/tydenni');

});
router.get('/denik/zaznamy', function(req, res, next) {
    res.render('pessos/denik/zaznamy');

});





router.get('/plany', function(req, res, next) {
    res.render('pessos/plany');

});

router.get('/profile', function(req, res, next) {
    res.render('pessos/profile');
    /*
        const authcookie = req.cookies.jwt
        jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                console.log('notloged');
                return res.status(200).render('index', {
                    logedIn: false
                });
            } else if (data.id) {
                console.log('logedin');
                req.id = data.id
                return res.status(200).render('index', {
                    logedIn: true
                });
            }

        });
    */
});

module.exports = router;
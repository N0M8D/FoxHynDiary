const db = require("../database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const RequestIp = require('@supercharge/request-ip');
const mySqlSelect = require('../mysql/select');


exports.checkToken = (req, res, next) => {
    const ip = RequestIp.getClientIp(req)
    console.log('IP in statistiky ' + ip);
    //get authcookie from requestconst authcookie = req.cookies.authcookie
    //verify token which is in cookie value
    const authcookie = req.cookies.jwt
    jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).render('auth/login', {
                error: "K přístupu k této stránce je nutné být přihlášen.."
            })
        } else if (data.id) {
            req.id = data.id
            console.log('AUTH OK');
            next();
        }

    });
}



exports.logout = async(req, res) => {
    try {
        const token = req.cookies.jwt;
        const verifyID = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verifyID);

        req.token = token;
        res.clearCookie("jwt");
        console.log('loged out');
        return res.redirect('auth/login');
    } catch (error) {
        res.status(401).send(error);
    }
}


exports.changePassword = async(req, res, next) => {
    const { pid, password, passwordConfirm } = req.body;

    if (password == passwordConfirm && password != "") {
        let passw = await bcrypt.hash(password, 8);
        let id = pid;
        db.query('UPDATE users SET passw = ? WHERE id = ? ', [passw, id], (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Heslo změněno.');
                req.flash('message', 'Heslo uživatele úspěšně změněno.');
                return res.redirect('menu')

            }

        });
    } else {
        console.log('Error');
        req.flash('error', 'Chyba změny hesla');
        return res.redirect('menu')
    }
}


exports.login = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).render('auth/login', {
                error: "Email nebo heslo není vyplněno!"
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
            console.log(results);
            if (!results || results[0] == null || !(await bcrypt.compare(password, results[0].passw))) {
                return res.status(401).render('auth/login', {
                    error: "Email nebo heslo nesouhlasí"
                });
            } else {
                const id = results[0].id;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                });
                console.log("Token is:" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect('/');
                console.log('loged in');
            }
        })


    } catch (error) {
        console.log(error);
    }
}





exports.createuser = async function(req, next) {
    console.log(req.body);

    console.log('Zakládám uživatele ..')
    const { name, email, password, permissions, passwordConfirm, adress, tel } = req.body;

    if (password == passwordConfirm && password != "") {

        let passw = await bcrypt.hash(password, 8);
        console.log(passw);

        db.query('INSERT INTO users SET ? ', {
            name,
            passw,
            email,
            adress,
            telefon: tel,
            permissions,
            registered: new Date()

        }, (error, results) => {
            if (error) {
                console.log(error);
                req.flash('error', 'Chyba při zakládání uživatele');
                return res.redirect('menu')
            } else {
                next;
                //return res.render('auth/createuser', { message: "user registered", logedin: true });
            }

        })
    } else {
        console.log('ERROR');
        req.flash('error', 'Hesla se neshodují nebo nejsou zadanná');
        return res.redirect('menu')
    }
    //res.send("Form submitted");
}
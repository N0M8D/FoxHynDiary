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
            req.flash('error', 'Nejprve se musíte přihlásit!');
            return res.status(403).redirect('/auth/login')
        } else if (data.uid) {
            req.userData = data;
            console.log('AUTH OK');
            next();
        }

    });
}

exports.passUserData = (req, res, next) => {
    const authcookie = req.cookies.jwt
    jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            next();
        } else if (data.uid) {
            req.userData = data;
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
        req.flash('message', 'Uživatel odhlášen');
        return res.redirect('/auth/login');
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
            req.flash('error', 'Email nebo heslo není vyplněno.');
            return res.status(400).rendirect('auth/login');
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async(error, results) => {
            console.log(results);
            if (!results || results[0] == null || !(await bcrypt.compare(password, results[0].passw))) {
                req.flash('error', 'Email nebo heslo neodpovídá záznamům!');
                return res.status(401).redirect('/auth/login');
            } else {
                const uid = results[0].id;
                const uname = results[0].name;
                const uemail = results[0].email;
                const upermissions = results[0].permissions;
                const token = jwt.sign({ uid, uname, uemail, upermissions }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRATION
                });
                console.log("Token is:" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                console.log('loged in');
                req.flash('message', 'Uživatel přihlášen!');
                res.status(200).redirect('/');

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
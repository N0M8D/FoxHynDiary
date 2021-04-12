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
                mySqlSelect.fromUsers(function(result) {
                    res.render('admin/menu', { uzivatele: result, error: "Heslo změněno!" });

                })

            }

        });
    } else {
        console.log('Error');
        return res.render('admin/menu', { error: "ERROR" });
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





exports.createuser = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm, adress, tel } = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [email], async(error, results) => {
        if (error) {
            console.log(error);
        }

        if (results.length > 0) {
            console.log('email exists');
            return res.render('auth/createuser', {
                message: "Email je již použit"
            });
        } else if (password !== passwordConfirm) {
            console.log('wrong pass');
            return res.render('auth/createuser', {
                message: "Hesla se neshodují"
            });

        }


        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ? ', {
            name: name,
            passw: hashedPassword,
            email: email,
            adress: adress,
            telefon: tel,
            permissions: 'user',
            registered: 'NOW()'

        }, (error, results) => {
            if (error) {
                console.log(error);
            } else {
                return res.render('auth/createuser', { message: "user registered", logedin: true });
            }

        });
    });

    //res.send("Form submitted");
};
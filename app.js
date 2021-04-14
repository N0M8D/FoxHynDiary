// required packages
const express = require('express');
const cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
var favicon = require('serve-favicon');
var path = require('path');
const session = require('express-session');
const jwt = require("jsonwebtoken");
//const flash = require('flash');

// required routes .. 
var db = require('./database');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var pessosRouter = require('./routes/pessos');
var adminRouter = require('./routes/admin');
//var denikRouter = require('./routes/denik');

dotenv.config({
    path: './.env'
})

//start app
const app = express();


const publicDirectory = path.join(__dirname + '/public');

app.use(express.static(publicDirectory));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cookieParser());

app.use(session({
    secret: 'dahfabafbhbjfasfjfjbfabfasf',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

/*
app.use((req, res, next) => {
    const authcookie = req.cookies.jwt
    jwt.verify(authcookie, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            console.log('notloged');
            req.user = "NOT LOGED"
            next();
        } else if (data.id) {
            console.log('logedin');
            req.id = data.id
            req.user = "LOGED IN"
            next();
        }

    });
})
*/


//setup the engine for views
app.set('view engine', 'ejs');

const auth = require('./controllers/auth');

//get view screens
app.use('/', auth.passUserData, indexRouter);
app.use('/auth', auth.passUserData, authRouter);
app.use('/pessos', auth.passUserData, pessosRouter);
app.use('/admin', auth.passUserData, adminRouter);
//app.use('/pessos/denik', denikRouter);






//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', auth.passUserData, function(req, res) {
    res.render('404', { userData: req.userData });
});

module.exports = app;

app.listen('3000', () => {
    console.log('Server stared on port 3000')
});
// required packages
const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
const dotenv = require('dotenv');
var favicon = require('serve-favicon');
var path = require('path');

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

//setup the engine for views
app.set('view engine', 'ejs');



//get view screens
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/pessos', pessosRouter);
app.use('/admin', adminRouter);
//app.use('/pessos/denik', denikRouter);






//The 404 Route (ALWAYS Keep this as the last route)
app.get('*', function(req, res) {
    res.render('404');
});

module.exports = app;

app.listen('3000', () => {
    console.log('Server stared on port 3000')
});
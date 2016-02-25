var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('express-flash');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var dotenv = require('dotenv');
var csurf = require('csurf');
var moment = require('moment');

var db = require('./data/db');

var routes = require('./routes/index');
var users = require('./routes/users');
var arguments = require('./routes/arguments');
var questions = require('./routes/questions');

dotenv.load({ path: __dirname + '/.env' });
var passportConf = require('./config/passport');

var app = express();
app.locals.moment = moment;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon('./public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}));
app.use(flash());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

app.use(csurf());
app.use(function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/arguments',arguments);
app.use('/questions',questions);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// Create and initialize the DB
app.database = new db.Database(process.env.DBNAME_PROD);
app.database.initialize(function() {
    console.log("Database is ready");
});
app.set('db', app.database);

module.exports = app;

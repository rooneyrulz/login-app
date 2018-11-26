const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const messages = require('express-messages');
const validator = require('express-validator');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();

//Connecting to mongodb
let Connection = require('./api/config/database');
mongoose.promise = global.Promise;

app.use(morgan('dev'));

//Set Tamplate Engine
app.set('views', path.resolve(__dirname, 'views'));
app.engine('handlebars', expressHandlebars({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

//Set up Body Parser & Cookie Parser Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

//Set up Public Folder
app.use(express.static(path.resolve(__dirname, 'public')));

//Express Session Middleware
app.use(session({
   secret: 'copy cat',
   resave: true,
   saveUninitialized: true,
   cookie: { secure: false }
}));

//Express Flash Middleware
app.use(flash());

//Express Messages Middleware
app.use((req, res, next) => {
   res.locals.success_message = req.flash('success_msg');
   res.locals.error_message = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
})

//Express Validator Middleware
app.use(validator({
    errorFormatter: (param, msg, value) => {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));

//Require Passport
require('./api/config/passport')(passport);

//Passport Initialize Middleware
app.use(passport.initialize());
//Passport Session Middleware
app.use(passport.session());

//Route for Index
const indexRoute = require('./api/routes/index');
app.use('/home', indexRoute);

//Route for Register
const registerRoute = require('./api/routes/register');
app.use('/user', registerRoute);

//Route for Login
const loginRoute = require('./api/routes/login');
app.use('/user', loginRoute);

app.set('port', (process.env.PORT || 3000));

module.exports = app;

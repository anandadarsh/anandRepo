var express = require('express');
var path = require('path');
var app = express();
var swig = require('swig');
var swig = new swig.Swig();
var bodyParser = require('body-parser');
require('dotenv').config();

//use databases accesss

var mongojs = require('mongojs');
var db = mongojs('medical',['contact']);

//session
var session = require('express-session')
app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 60000 }}));
 
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(__dirname + '/public'));

//middleware 
app.use(function(req, res, next) {
  res.locals.userName = req.session.username;
  res.locals.userEmail = req.session.email;
  
  next();
});



var home = require('./route/home.js');
var about = require('./route/about.js');
var gallery = require('./route/gallery.js');
var contact = require('./route/contact.js');
var contact = require('./route/contact.js');
var login = require('./route/login.js');
var logout = require('./route/logout.js');

app.use('/home',home);
app.use('/about',about);
app.use('/gallery',gallery);
app.use('/contact',contact);
app.use('/login',login);
app.use('/logout',logout);

app.listen(process.env.PORT);
console.log('code is runnig perfect!!');
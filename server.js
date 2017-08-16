// -----------------   Dependencies   -----------------
var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var exphbs = require('express-handlebars');




// -----------------   Setup Handlbars   -----------------
app.set('views', './app/views');
app.engine('hbs', exphbs({
  extname: '.hbs'
}));
app.set('view engine', '.hbs');




// -----------------   Setup BodyParser   -----------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




// -----------------   Setup Passport   -----------------
app.use(session({ secret: 'powder blue', resave: true, saveUninitialized: true }));  // Session secret
app.use(passport.initialize());
app.use(passport.session());  // Persistent login session




// -----------------   Setup Models   -----------------
var models = require('./app/models');




// -----------------   Routes   -----------------
var authRoute = require('./app/routes/auth.js')(app, passport);




// -----------------   Load Passport strategies   -----------------
require('./app/config/passport/passport.js')(passport, models.user);




// -----------------   Index route   -----------------
app.get('/', function(req, res) {
  res.send('This is a test screen');
});




// -----------------   Server listener   -----------------
app.listen(3000, function(err) {
  if(!err) {
    console.log('Site is live on port 3000');
  }else {
    console.log(err);
  }
});



// -----------------   Sync Database   -----------------
models.sequelize.sync().then(function() {
  console.log('Database looks good');
}).catch(function(err) {
  console.log('Something is wrong with the database');
});

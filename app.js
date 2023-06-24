var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// A. tạo router (1 model => 1 router)
var toyRouter = require ('./routes/toy');
var aboutRouter = require ('./routes/about');
var legoRouter = require ('./routes/lego');


var app = express();

// 1. config mongoose
var mongoose = require('mongoose');
var uri = "mongodb+srv://tdu2512:Link68203@cluster0.5ggmkdy.mongodb.net/GCH1102";
mongoose.connect(uri)
.then(() => console.log ('ok'))
.catch((err) => console.log('fail'));

// 2. config body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended : false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// B. config router
app.use('/toy', toyRouter);

app.use('/about', aboutRouter);

app.use('/lego', legoRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 3. set web server port
var port = process.env.PORT || 3001;
app.listen(port);

module.exports = app;
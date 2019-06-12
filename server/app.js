var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productsRouter = require('./routes/products');

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://jordan:uHyWLakjZp3TQvbf@cluster0-eyvt0.mongodb.net/VGX?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/index.html')));

app.use('/server', productsRouter);

module.exports = app;

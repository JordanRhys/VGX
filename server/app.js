var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var productsRouter = require('./routes/products');

const apiKey = process.env.DB_KEY;

var mongoose = require('mongoose');
var mongoDB = apiKey;
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

app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../build/index.html'));
});

module.exports = app;

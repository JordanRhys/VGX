var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

var productsRouter = require('./routes/products');

const apiKey = process.env.DB_KEY;

var mongoose = require('mongoose');
var mongoDB = "mongodb+srv://jordan:uHyWLakjZp3TQvbf@cluster0-eyvt0.mongodb.net/VGX?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'client/public')));

app.use('/server', productsRouter);

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));
      
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

module.exports = app;

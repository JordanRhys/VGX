#! /usr/bin/env node
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Product = require('./models/product')
var Category = require('./models/category')

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://jordan:uHyWLakjZp3TQvbf@cluster0-eyvt0.mongodb.net/VGX?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var categories = []

function productCreate(itemID, name, desc, category, release_date, sell, buy, exch, newbool, stock, cb) {
  productdetail = { 
    itemID: itemID,
    name: name,
    category: category,
    sell: sell,
    new: newbool,
    stock: stock
  }
  if (desc != false) productdetail.desc = desc
  if (release_date != false) productdetail.release_date = release_date
  if (buy != false) productdetail.buy = buy
  if (exch != false) productdetail.exch = exch
    
  var product = new Product(productdetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}

function categoryCreate(name, cb) {
  categorydetail = { 
    name: name,
  }
    
  var category = new Category(categorydetail);    
  category.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Category: ' + category);
    categories.push(category)
    cb(null, category)
  }  );
}

function createProducts(cb) {
    async.parallel([
        function(callback) {
          productCreate('PS4500REGBLKA', 'PlayStation 4 500GB Black, A Grade', false, '5d00db1d22ff61263117a641', false, 175, 101, 122, false, 5, callback);
        },
        function(callback) {
          productCreate('PS4500REGBLKB', 'PlayStation 4 500GB Black, B Grade', false, '5d00db1d22ff61263117a641', false, 165, 95, 115, false, 3, callback);
        },
        function(callback) {
          productCreate('PS4500REGBLKC', 'PlayStation 4 500GB Black, C Grade', false, '5d00db1d22ff61263117a641', false, 155, 89, 108, false, 8, callback);
        },
        function(callback) {
          productCreate('PS4500REGBLKN', 'PlayStation 4 500GB Black, New', false, '5d00db1d22ff61263117a641', false, 195, false, false, true, 2, callback);
        },
        ],
        // optional callback
        cb);
}

function createCategories(cb) {
  async.parallel([
    function(callback) {
      categoryCreate('PlayStation 4 Consoles', callback)
    },
    function(callback) {
      categoryCreate('PlayStation 4 Games', callback)
    },
    function(callback) {
      categoryCreate('PlayStation 4 Accessories', callback)
    },
  ],
  cb);
}

async.series([
    createProducts,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});





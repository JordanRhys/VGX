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
var TopProduct = require('./models/top_product')

var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://jordan:uHyWLakjZp3TQvbf@cluster0-eyvt0.mongodb.net/VGX?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var categories = []
var topproducts = []

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

function topProductCreate(product, cb) {
  detail = {
    product: product
  }

  var topproduct = new TopProduct(detail);
  topproduct.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Top Product: ' + topproduct);
    topproducts.push(topproduct)
    cb(null, topproduct)
  });
}

function createProducts(cb) {
    async.parallel([
        // function(callback) {
        //   productCreate('5055856420354', 'RAGE 2', false, '5d024cb81c9d44000079b49d', false, 40, 26, 30, false, 4, callback);
        // },
        // function(callback) {
        //   productCreate('5055856420187', 'RAGE 2', false, '5d00db1d22ff61263117a642', false, 40, 26, 30, false, 7, callback);
        // },
        function(callback) {
          productCreate('045496420055', 'Legend of Zelda: Breath of the Wild', false, '5d024cf41c9d44000079b4a0', false, 45, 30, 33, false, 15, callback);
        },
        ],
        // optional callback
        cb);
}

function createTopProducts(cb) {
  async.parallel([
    function(callback) {
      topProductCreate('5d00dc4023562626537a73ae', callback)
    },
    function(callback) {
      topProductCreate('5d00dc4023562626537a73af', callback)
    },
    function(callback) {
      topProductCreate('5d00dc4023562626537a73b0', callback)
    },
    function(callback) {
      topProductCreate('5d00dc4023562626537a73b1', callback)
    },
  ],
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





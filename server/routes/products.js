var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/topproducts', (req, res, next) => {
    Product.find().exec((err, results) => {
        if (!err) { res.json(results)}
    })
    console.log('sent products')
})

router.get('/', function(req, res, next) {
    res.send('Product Router');
});

module.exports = router;
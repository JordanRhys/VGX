var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var TopProduct = require('../models/top_product');

router.get('/topproducts', (req, res, next) => {
    TopProduct.find().populate('product').exec((err, results) => {
        console.log(results)
        if (!err) { 
            res.json(results)
        } else {
            console.log(err)
        }
    })
    
})

router.get('/product/:itemID', (req, res, next) => {
    Product.findOne({itemID: req.params.itemID}).populate('category').exec((err, result) => {
        console.log(result)
        if (!err) {
            if (result === undefined) {
                res.json({
                    "name": "Item not found"
                })
            } else {
                res.json(result)
            }
        } else {
            console.log(err)
        }
    })
})

router.get('/', function(req, res, next) {
    res.send('Product Router');
});

module.exports = router;
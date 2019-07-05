var express = require('express');
var router = express.Router();

var async = require('async');

var Product = require('../models/product');
var TopProduct = require('../models/top_product');
var Category = require('../models/category');

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

router.get('/categories', (req, res, next) => {
    Category.find().exec((err, results) => {
        console.log(results)
        if (!err) {
            if (results === undefined) {
                res.json({
                    "name": "Categories not found"
                })
            } else {
                res.json(results)
            }
        } else {
            console.log(err)
        }
    })
})

router.get('/category/:name', (req, res, next) => {

    var cat;
    Category
        .findOne({"spaceless_name": req.params.name})
        .exec((err, result) => {
        if (!err) {
            if (result === undefined) {
                console.log("RESULT IS UNDEFINED")
                res.json({
                    "name": "Category not found"
                })
            } else {
                cat = result._id;

                Product
                    .find({"category": cat})
                    .populate('category')
                    .exec((err, results) => {
                        if (!err) {
                            if (results === undefined) {
                                res.json({
                                    "name": "Products not found"
                                })
                            } else {
                                res.json(results);
                            }
                        } else {
                            console.log(err)
                        }
                    })
            }
        } else {
            console.log(err);
        }
    });
})

router.get('/search/:search', (req, res, next) => {
    const similar = req.params.search;
    console.log(similar);
    Product
        .find({"name": {$regex: similar, $options: 'i'}})
        .populate('category')
        .exec((err, result) => {
            if (!err) {
                if (result === undefined || result.length === 0) {
                    console.log('Search is Undefined');
                    res.json({
                        "name": "Products not found"
                    });
                } else {
                    res.json(result);
                }
            } else {
                console.log(err);
            }
        })
})

router.get('/basket/:items', (req, res, next) => {
    const items = req.params.items;
    const split = items.split(',');
    console.log(split);

    Product
        .find({"itemID": {$in: split}})
        .populate('category')
        .exec((err, results) => {
            if (!err) {
                if (results === undefined || results.length === 0) {
                    console.log('Search is Undefined or Length 0')
                    res.json({
                        "name": "Products not found"
                    });
                } else {
                    res.json(results);
                }
            } else {
                console.log(err);
            }
        })
})

router.get('/', function(req, res, next) {
    res.send('Product Router');
});

module.exports = router;
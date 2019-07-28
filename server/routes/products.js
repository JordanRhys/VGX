var express = require('express');
var router = express.Router();

var async = require('async');

var Product = require('../models/product');
var TopProduct = require('../models/top_product');
var Category = require('../models/category');

var async = require('async');

router.get('/topproducts', (req, res, next) => {
    TopProduct
        .find({})
        .populate('product')
        .exec((err, results) => {
            let extracted = [];
            results.map((product) => {
                extracted.push(product.product)
            });
            if (!err) { 
                res.json(extracted);
            } else {
                console.log(err);
            }
        }) 
})

router.get('/recent', (req, res, next) => {
    Product
        .find({})
        .limit(10)
        .sort({release_date: -1})
        .exec((err, results) => {
            if (!err) { 
                res.json(results)
            } else {
                console.log(err)
            }
        })
})

router.get('/product/similar/:category/:names', (req, res, next) => {
    const namesSplit = req.params.names.split(',');
    const namesSpaced = namesSplit.join(' ');
    console.log(namesSpaced);

    async.parallel({
        byName: function(callback) {
            Product
                .find({$text: {$search: namesSpaced}})
                .populate('category')
                .limit(5)
                .exec(callback);
        },
        byCat: function(callback) {
            Product
                .find({"category": req.params.category})
                .populate('category')
                .limit(5)
                .exec(callback);
        }
    }, function(err, results) {
        if (!err) {
            if (results === undefined) {
                res.json([]);
            } else {
                let joined = results.byName.concat(results.byCat);
                let ids = [];
                let filtered = [];
                joined.map((product) => {
                    if (ids.indexOf(product.itemID) === -1) {
                        filtered.push(product)
                        ids.push(product.itemID)
                    }
                });
                res.json(filtered);
            }
        } else {
            console.log(err)
        }
    })
})

router.get('/product/:itemID', (req, res, next) => {
    Product.findOne({itemID: req.params.itemID}).populate('category').exec((err, result) => {
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

router.get('/search/dropdown/:search', (req, res, next) => {
    const similar = req.params.search;
    Product
        .find({"name": {$regex: similar, $options: 'i'}})
        .limit(3)
        .populate('category')
        .exec((err, result) => {
            if (!err) {
                if (result === undefined || result.length === 0) {
                    res.json([]);
                } else {
                    res.json(result);
                }
            } else {
                console.log(err);
            }
        })
})

router.get('/search/:search', (req, res, next) => {
    const similar = req.params.search;
    Product
        .find({"name": {$regex: similar, $options: 'i'}})
        .populate('category')
        .exec((err, result) => {
            if (!err) {
                if (result === undefined || result.length === 0) {
                    res.json([]);
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
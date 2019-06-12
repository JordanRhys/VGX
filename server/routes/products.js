var express = require('express');
var router = express.Router();

var Product = require('../models/product');

router.get('/topproducts', (req, res, next) => {
    const products = [
        {
            itemID: 'PS4500REGBLKA',
            name: 'PlayStation 4 500GB Black, A Grade',
            category: 'PlayStation 4 Consoles',
            release_date: 'November 2013',
            sell: 175,
            cash: 101,
            exch: 122,
            new: false,
            stock: 5
        }, {
            itemID: 'PS4500REGBLKB',
            name: 'PlayStation 4 500GB Black, B Grade',
            category: 'PlayStation 4 Consoles',
            release_date: 'November 2013',
            sell: 165,
            cash: 95,
            exch: 115,
            new: false,
            stock: 3
        }, {
            itemID: 'PS4500REGBLKC',
            name: 'PlayStation 4 500GB Black, C Grade',
            category: 'PlayStation 4 Consoles',
            release_date: 'November 2013',
            sell: 155,
            cash: 89,
            exch: 108,
            new: false,
            stock: 8
        }, {
            itemID: 'PS4500REGBLKN',
            name: 'PlayStation 4 500GB Black, New',
            category: 'PlayStation 4 Consoles',
            release_date: 'November 2013',
            sell: 195,
            new: true,
            stock: 2
        }
    ];
    res.json(products)
    console.log('sent products')
})

router.get('/', function(req, res, next) {
    res.send('Product Router');
});

module.exports = router;
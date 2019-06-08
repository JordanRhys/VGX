var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Product Router');
});

module.exports = router;
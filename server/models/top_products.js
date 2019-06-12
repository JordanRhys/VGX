var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopProductsSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
});

module.exports = mongoose.module('TopProducts', TopProductsSchema);